// through2 is a thin wrapper around node transform streams
var path = require('path'),
    through = require('through2-concurrent'),
    fancyLog = require('fancy-log'),
    tinify = require('tinify'),
    PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-fez-tinypic';

function tinypng(apiKey, file) {
    var validExtensions = ['.png', '.jpg', '.jpeg'];

    if (!apiKey) {
        fancyLog(PLUGIN_NAME + ': 请先到 https://tinypng.com/developers 申请API Key');
        throw new PluginError(PLUGIN_NAME, '请在 fez.config.js 中配置 finypic 的 apikey');
    }
    tinify.key = apiKey;

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, '不被支持的数据流'));
            return;
        }

        if (validExtensions.indexOf(path.extname(file.path)) === -1) {
            fancyLog(PLUGIN_NAME + ': 不被支持的图片格式 ' + file.path);
            cb(null, file);
            return;
        }

        tinify.fromBuffer(file.contents).toBuffer(function(err, resultData) {
            if (!err) {
                file.contents = resultData;
            }
            cb(null, file);
        })
    });
};
// Exporting the plugin main function
module.exports = tinypng;