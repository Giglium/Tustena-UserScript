# Tustena UserScript

A script that populates an *intervention report* on **Tustena CRM**. You can create how many templates you want and every time you can fill the form without any effort.

## Usage

1. Install a script manager:

   * ![Firefox](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/firefox.png) [Tampermonkey](https://addons.mozilla.org/it/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/);
   * ![Chrome](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/chrome.png) [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo);
   * ![Opera](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/opera.png) [Tampermonkey](https://addons.opera.com/en/extensions/details/tampermonkey-beta/);
   * ![Safari](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/safari.png) [Tampermonkey](https://apps.apple.com/us/app/tampermonkey/id1482490089);
   * ![Edge](https://raw.githubusercontent.com/reek/anti-adblock-killer/gh-pages/images/msedge.png) [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s).

2. Directly install it from [Github](https://github.com/Giglium/Tustena-UserScripts/#) by [clicking here](https://github.com/Giglium/Tustena-UserScript/raw/main/dist/tustena.user.js);

3. Edit the script with your script manager and edit the following:

   * line 13: `// @include <tustena-url>`;

   * line 16: After the `(()=>{` create some line-break  and create the variable  `window.clients` like the following:

     ``` javascript
       window.clients = [
                    {
                     alias: 'Name to display on select',
                     title: 'The title of the intervention report',
                     company: 'The company where the intervention report belog',
                     brand: 'The brand of the intervention report',
                     activity: 'The type of the activity of the intervention report',
                     description: 'A template for the activity description of the intervention report',
                 }
           ]
     ```

4. Go to `<tustena-url>`;

5. Find the big red button in the bottom right corner;

6. Click on it!
