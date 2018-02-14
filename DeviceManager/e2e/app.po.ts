// documentation and examples: http://www.protractortest.org/#/api
import { browser, by, element } from 'protractor';

abstract class Page {
  navigateTo(route: string)  {
    return browser.get(route);
  }
}

export class AppPage extends Page {

  getParagraphText() {
    return 'Welcome to app!';
  }
  getDefaultPageNotFound() {
    return element(by.id('defaultMsg')).getText();
  }
}
export class SignInPage extends Page {
  getSignInBtn() {
    return element(by.id('sign_in_btn'));
  }
}


