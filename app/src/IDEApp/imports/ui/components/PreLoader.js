var PreLoader = React.createClass({
    getInitialState: function () {
        return {
            display: 'none'
        }
    },
    show: function (cb) {
        this.setState({display: 'block'}, cb);
    },
    hide: function (cb) {
        this.setState({display: 'none'}, cb);
    },
    render: function () {
        return (
            <div className="preloader" style={{display: this.state.display}}>
                <img src="/public/imgs/preloader.gif" width="128" height="128"/>
            </div>
        );
    }
});

if('document' in window){
    window.Preloader = React.render(<PreLoader />, document.getElementById('app-preloader'));
}
