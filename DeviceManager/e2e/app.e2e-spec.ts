import { AppPage, SignInPage } from './app.po';

describe('device-manager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

  });

  it('should display welcome message', () => {
    page.navigateTo('');
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  it('default page not found msg', () => {
    page.navigateTo('pageNotFound');
    expect(page.getDefaultPageNotFound()).toEqual('Page not found');
  });
});

describe('device-manager Sing in page', () => {
  let page: SignInPage;

  beforeEach(() => {
    page = new SignInPage();

  });

  it('should display welcome message', () => {
    page.navigateTo('signin');
    expect(page.getSignInBtn()).toEqual('Signin');
  });
});


