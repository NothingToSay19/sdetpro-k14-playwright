import {test} from "@playwright/test";

test('Locator - Link text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    //xpath
    //await page.locator('//a[contains(text(), "Elemental")]').click();

    //css
    await page.locator('a:has-text("Elemental")').click();
    await page.waitForTimeout(2000);

})

test('Explicit Wait (waitForSelector)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    //xpath
    //await page.locator('//a[contains(text(), "Elemental")]').click();

    //css - Explicit wait
    await page.waitForSelector('a:has-text("Elemental")', {timeout: 10000});
    //await page.waitForTimeout(2000);

})

test('Link text - Filtering', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    //xpath
    //await page.locator('//a[contains(text(), "Elemental")]').click();

    //css - locator.filter
    await page.locator('a').filter({hasText: 'Elemental Selenium'}).click();
    //await page.waitForTimeout(2000);

})


test('Link text - Scroll Into View', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    //xpath
    //await page.locator('//a[contains(text(), "Elemental")]').click();

    //css - locator.filter
    const footerHyperlink = page.locator('a').filter({hasText: 'Elemental Selenium'});
    await footerHyperlink.scrollIntoViewIfNeeded({timeout: 2000});
    await page.waitForTimeout(2000);
    await footerHyperlink.click();
})

test('Multiple Matching', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    //xpath
    //await page.locator('//a[contains(text(), "Elemental")]').click();

    //css - locator.filter
    const footerHyperlink = await page.locator('a').elementHandles();
    await footerHyperlink[10].click();
})

test('Input & Clear', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    //xpath
    // await page.locator('//input[@id="username"]').fill('toitenteo');
    // await page.locator('//input[@id="password"]').fill('teodeptrai');
    // await page.locator('//button[@class="radius"]').click();

    //css
    await page.locator('#username').fill('toitenteo');
    await page.locator('#password').fill('teodeptrai');
    await page.locator('.radius').click();

    await page.waitForTimeout(2000);
})

test('WaitForLoadState', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    await page.locator('a:has-text("Form Authentication")').click();
    await page.waitForLoadState("domcontentloaded");

    //xpath
    // await page.locator('//input[@id="username"]').fill('toitenteo');
    // await page.locator('//input[@id="password"]').fill('teodeptrai');
    // await page.locator('//button[@class="radius"]').click();

    //css
    await page.locator('#username').fill('toitenteo');
    await page.locator('#password').fill('teodeptrai');
    await page.locator('.radius').click();

    await page.waitForTimeout(2000);
})

test.only('Element get hidden text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    await page.locator('a:has-text("Form Authentication")').click();
    await page.waitForLoadState("domcontentloaded");

    //xpath
    // await page.locator('//input[@id="username"]').fill('toitenteo');
    // await page.locator('//input[@id="password"]').fill('teodeptrai');
    // await page.locator('//button[@class="radius"]').click();

    //css
    await page.locator('#username').fill('toitenteo');
    await page.locator('#password').fill('teodeptrai');
    await page.locator('.radius').click();

    console.log(await page.locator('h4').textContent());
    console.log(await page.locator('h4').innerText())
    await page.waitForTimeout(2000);
})