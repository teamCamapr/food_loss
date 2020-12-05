// localstorageに郵便番号を設定, 取得
function setUserPostalCode(postalCode)
{
    localStorage.setItem("PostalCode", postalCode);
}

function loadUserPostalCode()
{
    return localStorage.getItem("PostalCode");
}