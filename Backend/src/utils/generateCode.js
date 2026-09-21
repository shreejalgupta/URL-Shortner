const generateCode = () => {
    const mainCode = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += mainCode.charAt(Math.floor(Math.random() * mainCode.length));
    }

    return code;
};

export default generateCode;