const logo = `<a style="text-decoration:underline;color:#2cb543;font-size:14px" target="_blank">
    <img src="data:image/png;base64,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" style="display:block;border:0;outline:none;text-decoration:none;margin:auto;" width="150" data-bit="iit" />
</a>`

const facebook = `<a href="https://facebook.com" style="text-decoration:underline;" target="_blank">
    <img style="width:24px;height:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD+SURBVHgB7ZTNjcIwEIXfmOyudle7ooRsB5SQpQI4IoRQOqADRCXkAG2AW6AC3EFygAsSHiagoAhBID9ISPBdPG9sz7NHloEXV6C0aE7XSxlclMPMut9/iVAnky7K46aFg6IwIgYbOWG0l0TeuWWFDKSY5s1nW/sUJblL7VXICYOMGPjp4lkUuAEvdOfLxJE3DRuKPoYM1MHsVmIgzy48xvw2EMMWZazP3aK85LnBCNgaa8kkCa5xQNbqg6qNSxlYKaR7vzqd052fvfbGYV29nzeopkWO07g4hRtRSs3lrcdhIF+BHwf/k1VARP3MfbgzL4MHM4g/MpSkihpPxg4cLEjwdmO8CAAAAABJRU5ErkJggg==" style="display:block;border:0;outline:none;text-decoration:none;margin:auto;" width="150" data-bit="iit" />
</a>`
const youtube = `<a href="https://youtube.com" style="text-decoration:underline;" target="_blank">
    <img style="width:24px;height:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFBSURBVHgB7ZTNTcNAEIXfbIiRUJDsDkIF5BK4OkkBlBCoAEpIC3QAJVBAwEckX6ADdxBL+IBkxcOsA/7BsLZlS7nkO+2OR++td1YPOLBv6Hchmk+vieiKwbZ8Hu+q6doud3IotVAUQjCHJGtmfho9+w//GkSL6YuUXHSCvdHan/3sVPHk3cU15H7ML1YVA5Baoi8Ik6pBes/9IKLnhXWG0SDenjgyzBswArQzyxibGh3PC/ULiRM1kxd2b+rlgpZCSxzvNThd+3fxVp3J9q2uv7VBzqd+47VzO0JLNu7EtpR1y4QVN+gvGgQwzEELHw+GywSpsPHkhPwhNP6D4cDaJA17OY2RHSovUu3AWlA1APE7+oLxmMkW69HiUsKOXXRTL4WdIa51PKfxYUsM21IrDZZ1RBN9XwUFJPf+V1wf2D9fI2xqkXw5OZEAAAAASUVORK5CYII=" style="display:block;border:0;outline:none;text-decoration:none;margin:auto;" width="150" data-bit="iit" />
</a>`
const instagram = `<a href="https://instagram.com" style="text-decoration:underline;" target="_blank">
    <img style="width:24px;height:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO8SURBVHgB3VXNbhxFEK7qn/VaRPKEF8jyBKwvXLM+wS1rLjliP0G8T0ByRUJ2lAs3hycgQRyRvE8A6wMSEkhenxIkhAdh7/RM/xTV3TPrJJNEuSYjtaana/r7quqrrgZ43x98k4GKswJM8amXdhREg0JaAtlAEJbnQAFq1MJegAglqPoUlzvlOxFUw2cjCRvHKPxtYjCQDkBYQB4kHCB/o3DENgDJ9rgW56p5YtHNNn/fXb6RIIELecKbRig9QSTIQC1JWsvAyCT8joSAMToX18+tNDubi/01iXqRQCg6RGlGCUQ4jMARlGTDgByBdAmQMJLwXCTgf1MUaLdI2ZHG5pihdnoRxJw7pH+ydwkgRZDSET1de3ydKgYuraVtGBoYyOYXXi/iHrlZ3sT5/fKlCJy6HIPAlNMcQQ6fMskyCDpCsqckDIOHWyDr++zM1lARmY3/kAjj/xi1cU6OGXKesrIORdcFqIopVzw3BNoA8Teq5rH0q+3BH188VDf+Xqjh5UL9dvd7Kfw2//9jGFwutPC/wqAqiPeC5j2DarROezcJggnYmMcKeTBRtZTWzKAoCzd+fOKRLrxsLuxnj34ww+eF/MgesBMlqmoLozM6jzAw0COIHrNHlAiS5/wWzQNc7pZeBBa/ud3ZUZmpVnCM81kZ9OphdKbznjNAQqygX0X6ioUN2NZ4FhP9ksaHRZDmTq75JD60gk9oclA4VS3imlBJ9KQd73sdgYklmWocO6GxYfWjrUol21ZXKuF0stms9BUFdozSAbT5nJB7TYoGV3CtQR6kzRgXs5J0NY+C5/Tkd5DVU5wflX6j+qRLK//D2hku0xX1CWL5cfUkgCSYATmo7sU0SPT7IM0TFpByvqu5JTej6bQQsv4aOvLoFGvhRYU9AjFYpRLNnmbReD4KWh8ClKX6+Ztd9uFjsdI31U/f7QyHz0sYsk1Xt7rqId05ZsueBlLXZ0H4JGTbX6IeMadf0aafuOneA8C/zuIOf/fLbcJwDwTXe/q3odQuFLeP1JeoT8Ct+JRkDYKrCNoT2VZNnI94/ZhS20g9KNoSaOtE7LCphQCTgJaLDvalbuo+Pzhh7yfrcmyrIoLmyHz2VraRvmrnby7Rp+LRn7v9CPixaPY3tE3tGtI5SOeBurPR3g3tu+tTuVWnqNCdc6ecvYjZu3BoujdisQ5B1HeuU9V1z3XaYB1BGw0IP2d19vDbZ+dvJbgmmhTuxnCMyhZ8FXEbDiD5yvQyxBbC80jEc1UvwV0u8Kgs4YN8/gdH2z/Hm399tgAAAABJRU5ErkJggg==" style="display:block;border:0;outline:none;text-decoration:none;margin:auto;" width="150" data-bit="iit" />
</a>`

const ask = `<p style="font-size: 16px; font-weight: 400; line-height: 24px; text-align: center;">
    Have questions? 
    <a>Contact us</a>
</p>`
const links = `<p style="display:flex;width:fit-content;margin:0 auto;padding-top:32px;">
    <span>${facebook}</span><span style="padding: 0 24px;">${youtube}</span><span>${instagram}</span>
</p>`

const copyright = `<p style ="color:#757575;font-size:12px;font-weight:400;margin-top:16px;">Copyright © ${new Date().getFullYear()}</p>`

module.exports = { logo, ask, links, copyright }