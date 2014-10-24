var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConflictStrategyBase = require("awayjs-core/lib/library/ConflictStrategyBase");
var Error = require("awayjs-core/lib/errors/Error");
var ErrorConflictStrategy = (function (_super) {
    __extends(ErrorConflictStrategy, _super);
    function ErrorConflictStrategy() {
        _super.call(this);
    }
    ErrorConflictStrategy.prototype.resolveConflict = function (changedAsset, oldAsset, assetsDictionary, precedence) {
        throw new Error('Asset name collision while AssetLibrary.namingStrategy set to AssetLibrary.THROW_ERROR. Asset path: ' + changedAsset.assetFullPath);
    };
    ErrorConflictStrategy.prototype.create = function () {
        return new ErrorConflictStrategy();
    };
    return ErrorConflictStrategy;
})(ConflictStrategyBase);
module.exports = ErrorConflictStrategy;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L2Vycm9yY29uZmxpY3RzdHJhdGVneS50cyJdLCJuYW1lcyI6WyJFcnJvckNvbmZsaWN0U3RyYXRlZ3kiLCJFcnJvckNvbmZsaWN0U3RyYXRlZ3kuY29uc3RydWN0b3IiLCJFcnJvckNvbmZsaWN0U3RyYXRlZ3kucmVzb2x2ZUNvbmZsaWN0IiwiRXJyb3JDb25mbGljdFN0cmF0ZWd5LmNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxvQkFBb0IsV0FBWSw4Q0FBOEMsQ0FBQyxDQUFDO0FBRXZGLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFFM0QsSUFBTSxxQkFBcUI7SUFBU0EsVUFBOUJBLHFCQUFxQkEsVUFBNkJBO0lBRXZEQSxTQUZLQSxxQkFBcUJBO1FBSXpCQyxpQkFBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFFTUQsK0NBQWVBLEdBQXRCQSxVQUF1QkEsWUFBbUJBLEVBQUVBLFFBQWVBLEVBQUVBLGdCQUF1QkEsRUFBRUEsVUFBaUJBO1FBRXRHRSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxzR0FBc0dBLEdBQUdBLFlBQVlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO0lBQ3RKQSxDQUFDQTtJQUVNRixzQ0FBTUEsR0FBYkE7UUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEscUJBQXFCQSxFQUFFQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFDRkgsNEJBQUNBO0FBQURBLENBaEJBLEFBZ0JDQSxFQWhCbUMsb0JBQW9CLEVBZ0J2RDtBQUVELEFBQStCLGlCQUF0QixxQkFBcUIsQ0FBQyIsImZpbGUiOiJsaWJyYXJ5L0Vycm9yQ29uZmxpY3RTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmxpY3RTdHJhdGVneUJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQ29uZmxpY3RTdHJhdGVneUJhc2VcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBFcnJvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Vycm9yXCIpO1xuXG5jbGFzcyBFcnJvckNvbmZsaWN0U3RyYXRlZ3kgZXh0ZW5kcyBDb25mbGljdFN0cmF0ZWd5QmFzZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0cHVibGljIHJlc29sdmVDb25mbGljdChjaGFuZ2VkQXNzZXQ6SUFzc2V0LCBvbGRBc3NldDpJQXNzZXQsIGFzc2V0c0RpY3Rpb25hcnk6T2JqZWN0LCBwcmVjZWRlbmNlOnN0cmluZylcblx0e1xuXHRcdHRocm93IG5ldyBFcnJvcignQXNzZXQgbmFtZSBjb2xsaXNpb24gd2hpbGUgQXNzZXRMaWJyYXJ5Lm5hbWluZ1N0cmF0ZWd5IHNldCB0byBBc3NldExpYnJhcnkuVEhST1dfRVJST1IuIEFzc2V0IHBhdGg6ICcgKyBjaGFuZ2VkQXNzZXQuYXNzZXRGdWxsUGF0aCk7XG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlKCk6Q29uZmxpY3RTdHJhdGVneUJhc2Vcblx0e1xuXHRcdHJldHVybiBuZXcgRXJyb3JDb25mbGljdFN0cmF0ZWd5KCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gRXJyb3JDb25mbGljdFN0cmF0ZWd5OyJdfQ==