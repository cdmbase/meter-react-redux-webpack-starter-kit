import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeM from 'codemirror';
import key from 'keymaster';

import {matchExtension} from '../../../helpers/match';
import { fs } from '../../../actions/fs-action';
import { file } from '../../../actions/box-action';

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

CodeM.commands.autocomplete = function(cm) {
    cm.showHint({hint: CodeM.hint.anyword});
};

export default class CMEditorArea extends Component {
    constructor(...options) {
        super(...options);
    }

    save() {
        let { workspace } = this.props;
        let file = this.file;
        const text = this.refs.mirror.codeMirror.doc.getValue();
        this.props.update(workspace._id, file.relativePath, text);
    }
    defaultOptions = {
        styleSelectedText: true,
        lineWrapping: true,
        lineNumbers: true,
        indentUnit: 4,
        keyMay: "ide",
        showTrailingSpace: true,
        theme: "dracula",
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
        viewportMargin: 5,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-S": () => this.save()
        }

    };

    get content() {
        let { editor, content } = this.props;
        return content[editor.active] || ""
    }

    get file() {
        let { editor, list } = this.props;
        return list[editor.active];
    }

    render() {
        let file = this.file;
        let { extension } = file || {};
        let options = {...this.defaultOptions , mode: { name: matchExtension({ type: extension }),  globalVars: true}};



        return (
            <div className="editor no-terminal">
                <div className="panel root ">
                    <div className="contents-wrapper contents">
                        {file ? (
                            <Codemirror ref="mirror"
                                        value={file} options={options}/>
                        ): (
                            <h1 className="empty-placeholder">File not selected</h1>
                        )}

                    </div>
                </div>
            </div>
        )
    }
}


