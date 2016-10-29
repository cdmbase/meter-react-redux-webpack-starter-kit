import fs from 'fs';
import readdir from 'readdir-plus';
import path from 'path';

const TYPE_DIR = 'directory';
const TYPE_FILE = 'file';


export const boxesPath = (Meteor.settings.private || {}).boxes.path || path.resolve(process.env.PWD, '/boxes');
