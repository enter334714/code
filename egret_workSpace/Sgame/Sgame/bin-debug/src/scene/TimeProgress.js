/**
 * Created by Saco on 2014/8/12.
 */
var TimeProgress = (function () {
    function TimeProgress() {
        this.progressReduceSpeed = 100;
        //TODO Timer倒计时是不准的，抽时间写个准确的倒计时工具
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.initProgressBar();
    }
    TimeProgress.prototype.startCounting = function () {
        this.start();
    };
    TimeProgress.prototype.onTimer = function (e) {
        this.reduceProgress(this.progressReduceSpeed);
    };
    TimeProgress.prototype.start = function () {
        this._progressBar.reset();
        this.progressLeft = GameConfig.TOTAL_TIME_NUM;
        this.progressReduceSpeed = GameConfig.TIME_SPEED_DEFAULT;
        this.reduceProgress(this.progressReduceSpeed);
        this._timer.start();
    };
    TimeProgress.prototype.stop = function () {
        this._timer.reset();
        this._timer.stop();
        egret.clearTimeout(this._timeOut);
    };
    TimeProgress.prototype.over = function () {
        EventCenter.dispatchEvent(new GameEvent(GameEvent.GAME_EVENT_GAMEOVER));
    };
    TimeProgress.prototype.initProgressBar = function () {
        this._progressBar = new ProgressBar(480);
    };
    TimeProgress.prototype.getProgressBar = function () {
        return this._progressBar;
    };
    TimeProgress.prototype.addProgress = function (count) {
        this.progressLeft += count;
        this.updateProgress();
    };
    TimeProgress.prototype.reduceProgress = function (count) {
        this.progressLeft -= count;
        this.updateProgress();
    };
    TimeProgress.prototype.updateProgress = function () {
        this._progressBar.setProgress(this.progressLeft, GameConfig.TOTAL_TIME_NUM);
        if (this._progressBar.getProgress() <= 0) {
            this.stop();
            this._timeOut = egret.setTimeout(this.over, this, 1000);
        }
        if (this.progressLeft > GameConfig.TOTAL_TIME_NUM)
            this.progressLeft = GameConfig.TOTAL_TIME_NUM;
    };
    TimeProgress.prototype.changeTimeSpeed = function (count) {
        this.progressReduceSpeed -= count;
        this.progressReduceSpeed = this.progressReduceSpeed < GameConfig.TIME_SPEED_DEFAULT ? GameConfig.TIME_SPEED_DEFAULT : this.progressReduceSpeed;
    };
    return TimeProgress;
})();
TimeProgress.prototype.__class__ = "TimeProgress";
