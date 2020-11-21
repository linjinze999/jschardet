/*
 * gbk
 */

var CharSetProber = require('./charsetprober');
var constants = require('./constants');

function GBKProber() {
    CharSetProber.apply(this);

    var ONE_CHAR_PROB = 0.5;
    var self = this;

    function init() {
        self.reset();
    }

    this.reset = function() {
        GBKProber.prototype.reset.apply(this);
        this._mNumOfMBChar = 0;
        this._mMBCharLen = 0;
        this._mFullLen = 0;
        this._mBasicAsciiLen = 0;
    };

    this.getCharsetName = function() {
        return "GBK";
    };

    this.feed = function(aBuf) {
        this._mFullLen += aBuf.length;
        for( var i = 0, c1, c2; i < aBuf.length; ) {
            c1 = aBuf.charCodeAt(i);
            if(c1 <= 0x7F) {
                // ascii
                i++;
                this._mBasicAsciiLen ++;
                continue;
            }
            c2 = aBuf.charCodeAt(i + 1);
            if (c1 >= 0x81 && c1 <= 0xFE && c2 >= 40 && c2 <= 0xFE && c2 !== 0x7F){
                i += 2;
                this._mNumOfMBChar ++;
                this._mMBCharLen += 2;
            } else {
                this._mState = constants.notMe;
                break;
            }
        }
        if( this.getState() == constants.detecting ) {
            if( this.getConfidence() > constants.SHORTCUT_THRESHOLD ) {
                this._mState = constants.foundIt;
            }
        }

        return this.getState();
    };

    this.getConfidence = function() {
        var unlike = 0.99;
        var mbCharRatio = 0;
        var nonBasciAsciiLen = (this._mFullLen - this._mBasicAsciiLen);
        if( nonBasciAsciiLen > 0 ) {
            mbCharRatio = this._mMBCharLen / nonBasciAsciiLen;
        }
        if( this._mNumOfMBChar < 6 && mbCharRatio <= 0.6 ) {
            for( var i = 0; i < this._mNumOfMBChar; i++ ) {
                unlike *= Math.pow(ONE_CHAR_PROB, this._mNumOfMBChar);
            }
            return 1 - unlike;
        } else {
            return unlike;
        }
    };

    init();
}
GBKProber.prototype = new CharSetProber();

module.exports = GBKProber;
