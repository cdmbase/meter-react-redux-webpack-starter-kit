const isMeteor = new Function('try {return !!Meteor;}catch(e){ return false;}');
function MyRawStream() {
}

module.exports = isMeteor;
