import { HomeSensePage } from './app.po';

describe('home-sense App', () => {
  let page: HomeSensePage;

  beforeEach(() => {
    page = new HomeSensePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
