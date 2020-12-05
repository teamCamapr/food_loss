// localstorageに市区町村を設定, 取得
function setUserMunicipality(municipality)
{
    localStorage.setItem("Municipality", municipality);
}

function loadUserMunicipality()
{
    return localStorage.getItem("Municipality");
}