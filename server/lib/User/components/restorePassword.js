const { logo, ask, links, copyright } = require('./helpers')

const getRestorePasswordComponent = (url) => {
    return (
        `
            <div style="background-color:rgba(245, 245, 247, 1); ">
            <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%;">
                <tbody>
                <tr style="border-collapse:collapse;">
                    <td style="padding:0;margin:0;font-size:0px;padding-top:32px;">
                        ${logo}
                    </td>
                </tr>
                <tr style="border-collapse:collapse;">
                    <td align="center" style="margin:0;padding-left:10%;padding-right:10%;padding-top:25px">
                        <table cellpadding="0" cellspacing="0" role="presentation" bgcolor="#FFFFFF" width="100%" style="border-radius: 20px;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td style="padding:20px;margin:0">
                                        <p style="font-size: 24px; font-weight: 600; text-align: center;">Reset your password</p>
                                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; text-align: center;">
                                            We’ve received a request to reset the password for the NaviFIt account. No changes have been made to your account yet.
                                        </p>
                                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; text-align: center; margin-bottom: 0;">
                                            You can reset your password by clicking the link below:
                                        </p>
                                        <tr style="border-collapse:collapse;">
                                            <td align="center" style="margin:0;padding-left:10px;padding-right:10px;padding-bottom:24px;">
                                                <span style="border-style:solid;border-width:0px;display:inline-block;width:auto">
                                                    <a href="${url}" style="text-decoration:none;color:#ffffff;font-size:14px;font-weight: 500;border-style:solid;border-color:#2230F6;border-width:8px 50px;display:inline-block;background:#2230F6;border-radius:100px;line-height:24px;width:auto;text-align:center" }} target="_blank">Reset password</a>
                                                </span>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="border-collapse:collapse;">
                    <td align="center" style="margin:0;padding-left:10%;padding-right:10%;padding-bottom:15px;">
                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; text-align: center;">
                            If you did not request a new password, please let us know immediately by replying to this email.
                        </p>
                        ${ask}
                        ${links}
                        ${copyright}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        `
    )
}

module.exports = { getRestorePasswordComponent }