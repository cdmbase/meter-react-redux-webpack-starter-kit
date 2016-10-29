export const MODE_STATE = 'MODE_STATE';
export const MODE_PROPS = 'MODE_PROPS';


export function observeChange(fields:Array<string>, mode = MODE_STATE):Function {
    return Component => (
        class ObservableComponent extends Component {
            _checkModification(state, props, key) {
                if(mode = MODE_PROPS) {
                    return !Object.is(this.props[key], props[key])
                } else {
                    return !Object.is(this.state[key], state[key])
                }
            }

            fetchCurrent(prevState, prevProps, key) {
                return mode == MODE_PROPS ? this.props[key] : this.state[key]
            }

            fetchPrev(prevState, prevProps, key) {
                return mode == MODE_PROPS ? prevProps[key] : prevState[key]
            }

            componentDidUpdate(prevProps:Object, prevState:Object) {
                super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
                fields.forEach(key => {
                    if(this._checkModification(prevState, prevProps, key)) {
                        const methodName = 'on' + key.replace(/^([\w])/, _ => _.toUpperCase()) + 'Change';
                        console.log("Method", methodName);
                        if(this[methodName]) {
                            this[methodName](this.fetchCurrent(prevState, prevProps, key), this.fetchPrev(prevState, prevProps, key))
                        }
                    }
                })
            }
        }
    )
}