import fs from 'fs';
import readdir from 'readdir-plus';
import path from 'path';

const TYPE_DIR = 'directory';
const TYPE_FILE = 'file';


export const boxesPath = (Meteor.settings.private || {}).boxes.path || path.resolve(process.env.PWD, '/boxes');
export const getTree = (boxId, pw = '/') => {
    return new Promise((resolve, reject) => {
        readdir(path.resolve(boxesPath, boxId, pw), { tree: true, return: 'details', stat: true }, function(err, files) {
            if(err) {
                reject(err);
            } else {
                files = transformTree(files[0] || {});
                files.collapsed = !!files.leaf;
                resolve({ files });
            }
        });
    });
};

export const transformTree = node => {
    let { content = [], extension, type, stat, path, name, basename, relativePath } = node;
    let element = {
        stat, path, name, relativePath, extension, basename, type,
        module: name,
        leaf: type == TYPE_FILE
    };
    if(type == TYPE_DIR) {
        element.children = content.map(el => transformTree(el));
        element.collapsed = true;
    }

    return element;
};