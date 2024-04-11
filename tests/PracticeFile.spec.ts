import {selectors, test} from "@playwright/test";
import {filteringLocatorByHTMLTag, findCssSelectorHasText} from "../utilities/LocatorHelper.spec";
import {
    acceptDialog,
    clearTextBeforeInput,
    click,
    dismissDialog,
    getDialogContent,
    locatorScrollIntoView,
    redirectTo,
    scrollingPageBasedOnPercentage,
    scrollingPageToTheBottom,
    scrollingPageToTheTop,
    selectDropDownByValue,
    waitForSelectorWithState
} from "../utilities/Utilities.spec";

test('Locator - Link text', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    const element = await findCssSelectorHasText(page, 'a', 'Elemental');

    await click(element)

    await page.waitForTimeout(2000);
})

test('Explicit Wait (waitForSelector)', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    await page.waitForSelector('a:has-text("Elemental")', {timeout: 10000});

    await page.waitForTimeout(2000);

})

test('Link text - Filtering', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    const element = await filteringLocatorByHTMLTag(page, 'a', 'Elemental');

    await click(element);

    await page.waitForTimeout(2000);

})


test('Link text - Scroll Into View', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    const footerHyperlink = await filteringLocatorByHTMLTag(page, 'a', 'Elemental');

    await locatorScrollIntoView(footerHyperlink, 5);

    await click(footerHyperlink);

    await page.waitForTimeout(2000);
})

/*
Deprecated and not encouraged for use.
* */
// test('Multiple Matching', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/');
//
//     //xpath
//     //await page.locator('//a[contains(text(), "Elemental")]').click();
//
//     //css - locator.filter
//     const footerHyperlink = await page.locator('a').elementHandles();
//     await footerHyperlink[10].click();
// })

test('Input & Clear', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/login');

    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('.radius');

    await clearTextBeforeInput(usernameInput, 'toitenHuy');
    await clearTextBeforeInput(passwordInput, 'deptraisieucapvutru');

    await click(loginButton);

    await page.waitForTimeout(2000);
})

test('WaitForLoadState', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    await page.locator('a:has-text("Form Authentication")').click();

    await page.waitForLoadState("domcontentloaded");

    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('.radius');

    await clearTextBeforeInput(usernameInput, 'toitenHuy');
    await clearTextBeforeInput(passwordInput, 'deptraisieucapvutru');

    await click(loginButton);
})

test('Element get hidden text', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/');

    const authenticationHyperLink = page.locator('a:has-text("Form Authentication")');
    await click(authenticationHyperLink);
    await page.waitForLoadState("domcontentloaded");

    //css
    await page.locator('#username').fill('toitenteo');
    await page.locator('#password').fill('teodeptrai');
    await page.locator('.radius').click();

    console.log(await page.locator('h4').textContent());
    console.log(await page.locator('h4').innerText())

    await page.waitForTimeout(2000);
})

test('Dropdown List - Select by value', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/dropdown');

    const dropdown = page.locator('#dropdown');

    await selectDropDownByValue(dropdown, '1');
    await page.waitForTimeout(2000);
})

test('Checkbox - checked if not isCheck = false', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/dynamic_controls');

    const checkbox = page.locator('input[type="checkbox"]');

    const removeButton = page.locator('#checkbox-example button');

    const isChecked = await checkbox.isChecked();

    if(!isChecked) {
        await checkbox.check();
        await click(removeButton);
        await waitForSelectorWithState(page, 'input[type="checkbox"]', 'hidden', 5);
    }

    await page.waitForTimeout(2000);
})

test('Enable input', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/dynamic_controls');

    const input = page.locator('#input-example input');
    const isEditable = await input.isEditable();
    console.log(`Edit duoc khong? ${isEditable}`);

     const enableButton = page.locator('button[onclick="swapInput()"]');

    if(isEditable === false) {
        await click(enableButton);
        await waitForSelectorWithState(page, '#input-example input', 'visible', 10);
        await clearTextBeforeInput(input, 'toi ten Huy, dep trai sieu cap vu tru!');
    }
    else {
        console.log('Sai roi!')
    }

    await page.waitForTimeout(3000);
})

test('JS Alert', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/javascript_alerts');

    const alertButton = page.locator('button[onclick="jsAlert()"]');
    //page.on for dialog
    await acceptDialog(page, false);

    const dialogMessage = await getDialogContent(page);

    await alertButton.click();

    console.log(dialogMessage);
    await page.waitForTimeout(3000);
})

test('JS Confirm', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/javascript_alerts');

    const alertButton = page.locator('button[onclick="jsConfirm()"]');
    //page.on for dialog
    await acceptDialog(page, false);

    const dialogMessage = await getDialogContent(page);

    await alertButton.click();

    console.log(dialogMessage);
    await page.waitForTimeout(3000);
})

test('JS Dismiss', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/javascript_alerts');

    const alertButton = page.locator('button[onclick="jsConfirm()"]');
    //page.on for dialog
    await dismissDialog(page);

    const dialogMessage = await getDialogContent(page);

    await alertButton.click();

    console.log(dialogMessage);
    await page.waitForTimeout(3000);
})

test('JS Accept with Message', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/javascript_alerts');

    const alertButton = page.locator('button[onclick="jsPrompt()"]');
    //page.on for dialog
    await acceptDialog(page, true, "Challenge Accepted");

    const dialogMessage = await getDialogContent(page);

    await alertButton.click();

    console.log(dialogMessage);
    await page.waitForTimeout(3000);
})

test('Scrolling to The Top Without Parameter', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/floating_menu');

    await scrollingPageToTheTop(page);

    await page.waitForTimeout(3000);
})

test('Scrolling to The Bottom Without Parameter', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/floating_menu');

    await scrollingPageToTheBottom(page);

    await page.waitForTimeout(3000);
})


test.only('Scrolling With Parameter Based on Percentage', async ({ page }) => {
    await redirectTo(page,'https://the-internet.herokuapp.com/floating_menu');

    await scrollingPageBasedOnPercentage(page, 0.5);

    await page.waitForTimeout(5000);
})
