const getRestorePasswordComponent = (link) => {
    return (
        `
            <div style="background-color:rgba(245, 245, 247, 1); ">
            <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%;">
                <tbody>
                <tr style="border-collapse:collapse;">
                    <td style="padding:0;margin:0;font-size:0px;padding-top:32px;">
                        <a style="text-decoration:underline;color:#2cb543;font-size:14px" target="_blank">
                            <img src="data:image/png;base64,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" style="display:block;border:0;outline:none;text-decoration:none;margin:auto;" width="150" data-bit="iit"/>
                        </a>
                    </td>
                </tr>
                <tr style="border-collapse:collapse;">
                    <td align="center" style="margin:0;padding-left:64px;padding-right:64px;padding-bottom:25px;padding-top:25px">
                        <table cellpadding="0" cellspacing="0" role="presentation" bgcolor="#FFFFFF" width="100%" style="border-radius: 20px;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td style="padding:20px;margin:0">
                                        <p style="font-size: 24px; font-weight: 600;">Reset your password</p>
                                        <p>
                                            We’ve received a request to reset the password for the NaviFIt account. No changes have been made to your account yet.
                                        </p>
                                        <p>
                                            You can reset your password by clicking the link below:
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </td>
                </tr>
                <tr style="border-collapse:collapse;">
                    <td align="center" style="margin:0;padding-left:10px;padding-right:10px;padding-bottom:15px;padding-top:20px">
                        <span style="border-style:solid;border-width:0px;display:inline-block;width:auto">
                            <a href="https://navifit.vercel.app/restore/${link}" style="text-decoration:none;color:#ffffff;font-size:14px;font-weight: 500;border-style:solid;border-color:#2230F6;border-width:8px 50px;display:inline-block;background:#2230F6;border-radius:100px;line-height:24px;width:auto;text-align:center" }} target="_blank">Reset password</a>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        `
    )
}

module.exports = { getRestorePasswordComponent }