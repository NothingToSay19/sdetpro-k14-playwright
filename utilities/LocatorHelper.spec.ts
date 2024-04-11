import {errors, Locator, Page} from "@playwright/test";

export async function findCssSelectorHasText (page: Page, htmlTag: string, text: string): Promise<Locator> {
    let locator: any;
    try {
        locator = page.locator(`${htmlTag}:has-text("${text}")`);
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
    return locator;
}

export async function filteringLocatorByHTMLTag (page: Page, htmlTag: string, text: string): Promise<Locator> {
    let locator: any;
    try {
        locator = page.locator(htmlTag).filter({hasText: text});
    } catch (e) {
        console.log(e instanceof errors.TimeoutError);
    }
    return locator;
}
