import {errors, Locator, Page, Selectors} from "@playwright/test";

enum State {
    Attached = 'attached',
    Detached = 'detached',
    Visible = 'visible',
    Hidden = 'hidden'
}

export async function locatorScrollIntoView(locator: Locator, timeoutInSecond?: number | undefined):Promise<Locator> {
    let action: any;
    try{
        // @ts-ignore
        action = locator.scrollIntoViewIfNeeded({timeout: timeoutInSecond * 1000});
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
    return action;
}

export async function clearTextBeforeInput(locator: Locator, text: string): Promise<void> {
    try{
        await locator.clear();
        await locator.fill(text);
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function click(locator: Locator, rightClickOrMiddleClick?: string): Promise<void> {
    try{
        // @ts-ignore
        if(rightClickOrMiddleClick == null){
            await locator.click();
        } else {
            // @ts-ignore
            switch (rightClickOrMiddleClick.toLowerCase()) {
                case 'right':
                    await locator.click({button: "right"});
                case 'middle':
                    await locator.click({button: "middle"});
                default:
                    console.log('Please input left | right | middle as optional of choice!')
            }
        }
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function redirectTo(page: Page, url: string): Promise<void> {
    try {
        await page.goto(url);
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function selectDropDownByValue(locator: Locator, value: string): Promise<void> {
    try {
        await locator.selectOption({value: value})
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function waitForSelectorWithState(page: Page, selector: string, state: string, timeoutInSeconds: number | undefined): Promise<void> {
    try {
        switch (state.toLowerCase()){
            case 'hidden':
                // @ts-ignore
                await page.waitForSelector(selector, { state: State.Hidden, timeout: timeoutInSeconds * 1000 })
            case 'visible':
                // @ts-ignore
                await page.waitForSelector(selector, { state: State.Visible, timeout: timeoutInSeconds * 1000 })
            case 'attached':
                // @ts-ignore
                await page.waitForSelector(selector, { state: State.Attached, timeout: timeoutInSeconds * 1000 })
            case 'detached':
                // @ts-ignore
                await page.waitForSelector(selector, { state: State.Detached, timeout: timeoutInSeconds * 1000 })
            default:
                console.log('Please input left | right | middle as optional of choice!')
        }
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function acceptDialog(page: Page, hasMessage: boolean, message?: string) {
    try {
        page.on('dialog', async dialog => {
            if(hasMessage) {
                await dialog.accept(message);
            } else {
                await dialog.accept();
            }
        })
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function dismissDialog(page: Page) {
    try {
        page.on('dialog', async dialog => {
            await dialog.dismiss();
        })
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function getDialogContent(page: Page): Promise<string> {
    let dialogMessage = '';
    try
    {
        page.on('dialog', async dialog => {
            dialogMessage = dialog.message();
        })
    }catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
    return dialogMessage;
}

export async function scrollingPageToTheBottom(page: Page) {
    try{
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        })
    }catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function scrollingPageToTheTop(page: Page): Promise<void> {
    try{
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        })
    }catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}

export async function scrollingPageBasedOnPercentage(page: Page, percentage: number) {
    try{
        if(percentage >= 0 && percentage <= 1) {
            await page.evaluate(scrollPercentage => {
                window.scrollTo(0, scrollPercentage * document.body.scrollHeight);
            },percentage)
        } else {
            console.log('% must be in range 0 - 1 e.g: 0.5 ~ 50%')
        }
    }catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
}