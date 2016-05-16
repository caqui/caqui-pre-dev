import React from 'react';

import Base from '../components/base';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default (WrappedElement) => {
    class ModelizeWrapper extends Base {
        static propTypes = WrappedElement.propTypes;
        static __ignoreChildren = WrappedElement.__ignoreChildren || false;

        static contextTypes = {
            caquiRelatedForm: React.PropTypes.string,
            caquiModel: React.PropTypes.any
        }


        constructor(props) {
            super(props);

            this.displayName = "ModelizeWrapper";

            // just to avoid useless re-render;
            this.guardedValue = null;
            this.lastVersion = 0;
        }

        componentDidMount() {
            const {caquiModel, caquiRelatedForm} = this.context;

            if (caquiModel) {
                const {model, name} = {
                    model: caquiModel,
                    name: this.props.name
                };

                const {element} = this.refs;

                const value = model.getValue(name);

                element.setValue(value);

                this.guardedValue = value;

                // TODO: um jeito mais simples e mais performatico de verificar mudanças
                // XXX: nem sei se isso é certo.
                this.unsubscribe = model.subscribe(() => {
                    //console.info("[%s, %s] ModelizeWrapper.subscribe %s %s", name, WrappedElement.name, this.lastVersion, model.getVersion());

                    // ???: provavelmente fiz isso para ver se já não ocorreu o setValue antes
                    // if (this.lastVersion === model.getVersion()) {
                    //   return;
                    // }

                    this.lastVersion = model.getVersion();

                    const value = model.getValue(name);
                    const {element} = this.refs;

                    // TODO: shouldComponentUpdate ???
                    // XXX: isso é pra evitar que o elemento renderize caso o valor não mude
                    // XXX: e também para que não renderize caso o valor não mude na hora de fazer undo ou redo :)
                    // XXX: é uma gambiarra quente
                    if (value != this.guardedValue) {
                        //console.info("[willUpdated][%s, %s] ModelizeWrapper.subscribe %s %s", name, WrappedElement.name, this.lastVersion, model.getVersion());

                        this.guardedValue = value;
                        element.setValue(value);
                    }
                });
            }
        }

        componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }

        onChange(before) {
            const {caquiModel} = this.context;
            const {name, model} = {
                model: caquiModel,
                name: this.props.name
            };

            return ({event, target, data}) => {
                if (before) {
                    before(event, data);
                }

                if (model && name) {
                    model.setValue(name, data);
                }
            }
        }

        setValue(value) {
            const {caquiModel} = this.context;
            const {name, model} = {
                model: caquiModel,
                name: this.props.name
            };

            if (model) {
                model.setValue(name, value);
            } else {
                this.refs.element.setValue(value);
            }
        }

        getValue() {
            const {caquiModel} = this.context;
            const {name, model} = {
                model: caquiModel,
                name: this.props.name
            };

            if (model) {
                return model.getValue(name);
            } else {
                return this.refs.element.getValue();
            }
        }

        dispatch(method, ...args) {
            // sorry, world
            if (WrappedElement.prototype.hasOwnProperty(method)) {
                this.refs.element[method].apply(this.refs.element, args);
            } else {
                throw new ReferenceError(`${method} is not defined on ${getDisplayName(WrappedElement)}`)
            }
        }

        render() {
            const newProps = {
                ...this.props
            };

            newProps.onChange = this.onChange(newProps.onChange);

            return (
                <div>
                    <WrappedElement {...newProps} ref="element" />
                </div>
            );
        }
    }

    return ModelizeWrapper;
}
