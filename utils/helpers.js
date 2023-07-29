module.exports = {
    isLoginPage: () => {
        if(document.location.pathname === '/login') {
            return true;
        } else {
            return false;
        }
    }
}