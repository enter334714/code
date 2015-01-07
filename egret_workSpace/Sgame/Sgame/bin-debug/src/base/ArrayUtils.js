/**
 * Created by Saco on 2014/8/15.
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.sortArray = function (arr, opt) {
        if (opt == this.SORT_NUM_ASC)
            return arr.sort(this.sortAsc);
        else if (opt == this.SORT_NUM_DESC)
            return arr.sort(this.sortDesc);
        else
            return arr.sort();
    };
    ArrayUtils.sortAsc = function (t1, t2) {
        if (parseInt(t1) > parseInt(t2))
            return 1;
        return -1;
    };
    ArrayUtils.sortDesc = function (t1, t2) {
        if (parseInt(t1) > parseInt(t2))
            return -1;
        return 1;
    };
    ArrayUtils.SORT_NUM_ASC = 0;
    ArrayUtils.SORT_NUM_DESC = 1;
    return ArrayUtils;
})();
ArrayUtils.prototype.__class__ = "ArrayUtils";
