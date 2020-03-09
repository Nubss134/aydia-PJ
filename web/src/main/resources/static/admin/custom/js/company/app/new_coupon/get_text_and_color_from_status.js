function getTextPKikakuFromStatus(status) {
    let result;
    switch (status) {
        case "IS_USING":
            result = "有効";
            break;
        case "FUTURE":
            result = "有効（掲載期限前）";
            break;
        case "NO_IMAGE":
            result = "無効（クーポン画像なし）";
            break;
        case "NO_COUPON":
            result = "無効（クーポン明細なし）";
            break;
        case "NO_BARCODE":
            result = "無効（バーコード画像なし）";
            break;
        case "NO_MEMBER":
            result = "無効（指定会員なし）";
            break;
        case "NO_NUMBER_COUPON":
            result = "無効（枚数設定なし）";
            break;
        case "IS_PASS":
            result = "無効（掲載終了）";
            break;
        case "IS_DISABLED":
            result = "無効";
            break;
    }
    return result;
}

function getColorPKikakuFromStatus(status) {
    let result;
    switch (status) {
        case "IS_USING":
            result = "#ffffff";
            break;
        case "FUTURE":
            result = "#ffffff";
            break;
        case "NO_IMAGE":
            result = "#FADBDA";
            break;
        case "NO_COUPON":
            result = "#FADBDA";
            break;
        case "NO_BARCODE":
            result = "#FADBDA";
            break;
        case "NO_MEMBER":
            result = "#FADBDA";
            break;
        case "NO_NUMBER_COUPON":
            result = "#FADBDA";
            break;
        case "IS_PASS":
            result = "#B7B7BB";
            break;
        case "IS_DISABLED":
            result = "#B7B7BB";
            break;
    }
    return result;
}
