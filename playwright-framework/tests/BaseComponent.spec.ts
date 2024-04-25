import {test} from "@playwright/test";
import HomePage from "../pages/HomePage";
import FooterComponent from "../models/components/global/footer/FooterComponent";
import InformationColumnComponent from "../models/components/global/footer/InformationColumnComponent";
import CustomerServiceColumnComponent from "../models/components/global/footer/CustomerServiceColumnComponent";
import MyAccountColumnComponent from "../models/components/global/footer/MyAccountColumnComponent";
import FollowUsColumnComponent from "../models/components/global/footer/FollowUsColumnComponent";

test('Test Component Page', async ({page})=> {
    await page.goto("https://demowebshop.tricentis.com/");
    const homePage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = homePage.footerComponent();
    const informationComponent: InformationColumnComponent = footerComponent.informationColumnComponents();
    const customerServiceComponent: CustomerServiceColumnComponent = footerComponent.customerServiceColumnComponent();
    const myAccountComponent: MyAccountColumnComponent = footerComponent.myAccountColumnComponent();
    const followUsComponent: FollowUsColumnComponent = footerComponent.followUsColumnComponent();

    const informationColumnTitle = await informationComponent.title().textContent();
    const customerServiceColumnTitle = await customerServiceComponent.title().textContent();
    const myAccountColumnTitle = await myAccountComponent.title().textContent();
    const followUsColumnTitle = await followUsComponent.title().textContent();

    // @ts-ignore
    console.log(`informationColumnTitle: ${informationColumnTitle.trim()}, customerServiceColumnTitle: ${customerServiceColumnTitle.trim()}`);

    // @ts-ignore
    console.log(`myAccountColumnTitle: ${myAccountColumnTitle.trim()}, followUsColumnTitle: ${followUsColumnTitle.trim()}`);

    await page.waitForTimeout(3000);

});