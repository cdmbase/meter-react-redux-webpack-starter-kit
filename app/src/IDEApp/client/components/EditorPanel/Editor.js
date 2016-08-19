import React, { Component } from 'react';
//import Codemirror from '../third_party/Codemirror';
import Codemirror from 'react-codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/display/rulers';
import 'codemirror/addon/display/panel';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/go/go';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/erlang/erlang';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter';
import 'codemirror/mode/rst/rst';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/properties/properties';
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/django/django';
import 'codemirror/mode/jade/jade';
import 'codemirror/mode/fortran/fortran';
import 'codemirror/mode/twig/twig';

var defaults = {
    markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};


const Editor = React.createClass({
    getInitialState: function () {
        return {
            code: defaults.javascript,
            mode: "javascript"
        };
    },
    updateCode: function (newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function () {
        var options = {
            styleSelectedText: true,
            lineWrapping: true,
            lineNumbers: true,
            indentUnit: 4,
            keyMay: "ide",
            showTrailingSpace: true,
            indentWithTabs: true,
            autoCloseTags: true,
            styleActiveLine: true,
            matchBrackets: true,
            highlightSelectionMatches: true,
            foldGutter: false,
            gutters: ["CodeMirror-linenumbers"],
            continueComments: true,
            matchTags: {
                bothTags: true
            },
            dragDrop: false,
            viewportMargin: 5

        };
        return (
            <div className="editor no-terminal">
                <div className="panel root ">
                    <div className="contents-wrapper contents">
                        <Codemirror
                            value={this.state.code} onChange={this.updateCode} options={options}/>
                    </div>
                </div>

            </div>
        )
    }
})


export default Editor;