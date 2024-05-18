const getResetPassword = (link) => {
    return (
        `
            <div style="width: 100%; background-color: rgb(245, 245, 247);">
                <div style="width: 100%; display: flex; flex-direction: row; justify-content: center">LOGO</div>
                <div style="text-align: center; background-color: #fff; border-radius: 20px; padding: 24px; gap: 24px; }}>
                    <h2>Reset your password</h2>
                    <p>
                        We’ve received a request to reset the password for the NaviFIt account. No changes have been made to your account yet.
                    </p>
                    <p>
                        You can reset your password by clicking the link below:
                    </p>
                    <a style="width: 210px; height: 40px; border-radius: 4px; background-color: rgb(34, 48, 246) }} href='https://navifit.vercel.app/restore/${link}'>Reset password</a>
                </div>
            </div>
        `
    )
}

module.exports = { getResetPassword }