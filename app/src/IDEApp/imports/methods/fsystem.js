import { transformTree, boxesPath, getTree } from '../common/helpers'
import fs from 'fs';
import readdir from 'readdir-plus';
import path from 'path';


Meteor.methods({
    "fs.tree": boxId => new Promise((resolve, reject) => {
        readdir(path.resolve(boxesPath, boxId), {tree: true, return: 'details', stat: true}, function (err, files) {
            if (err) {
                reject(err);
            } else {
                files = transformTree(files[0] || {});
                files.collapsed = !!files.leaf;
                resolve({files});
            }
        });
    }),
    "fs.ls": (boxId, pw = './') => new Promise((resolve, reject) => {
        readdir(path.resolve(boxesPath, boxId, pw), {
            recursive: false,
            tree: true,
            return: 'details',
            stat: true
        }, function (err, files) {
            resolve({files, err})
        });
    }),

    "fs.cat": (boxId, file) => new Promise((resolve, reject) => {
        fs.readFile(path.resolve(boxesPath, boxId, file), 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({data, err, path: path.resolve(boxesPath, boxId, file)})
            }
        })
    }),

    "fs.change": (boxId, relativePath, content = "") => new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(boxesPath, boxId, relativePath), content, (err) => {
            if (err) {
                reject(err);
            }
            resolve({ok: true});
        })
    }),

    "fs.mkdir": (boxId, pw, dirName) => {
        fs.mkdirSync(path.resolve(boxesPath, boxId, pw, dirName));
    },

    "fs.rename": (boxId, pw, newName) => {
        let pwd = pw.split('/');
        pwd.pop();
        pwd = path.resolve(boxesPath, boxId,...pwd);

        fs.rename(path.resolve(pwd, pw), path.resolve(pwd, newName), () => {

        })
    },
    "fs.unlink": (boxId, pw) => {
        fs.unlink(path.resolve(boxesPath, boxId, pw), () => {

        })
    }
});
