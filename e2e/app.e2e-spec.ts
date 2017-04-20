import { FoundersMiniInboxPage } from './app.po';

describe('founders-mini-inbox App', () => {
  let page: FoundersMiniInboxPage;

  beforeEach(() => {
    page = new FoundersMiniInboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
