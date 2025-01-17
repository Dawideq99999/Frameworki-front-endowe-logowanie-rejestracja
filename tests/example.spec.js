// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/user/login');

    // Check if the login page is loaded
    await expect(page.locator('h1')).toHaveText('Welcome Back');

    // Fill in the login form
    await page.locator('input[placeholder="Enter your email"]').fill('test@example.com');
    await page.locator('input[placeholder="Enter your password"]').fill('password123');

    // Submit the form
    await page.locator('button', { hasText: 'Log In' }).click();

    // Wait for navigation to the profile page
    await page.waitForURL('http://localhost:3000/user/profile');

    // Validate successful login by checking for specific elements on the profile page
    await expect(page.locator('h1')).toHaveText(/Welcome/);
    await expect(page.locator('button', { hasText: 'Log Out' })).toBeVisible();
  });

  test('should fail login with invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/user/login');

    // Check if the login page is loaded
    await expect(page.locator('h1')).toHaveText('Welcome Back');

    // Fill in the login form with invalid credentials
    await page.locator('input[placeholder="Enter your email"]').fill('wrong@example.com');
    await page.locator('input[placeholder="Enter your password"]').fill('wrongpassword');

    // Submit the form
    await page.locator('button', { hasText: 'Log In' }).click();

    // Validate error message is displayed
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should restrict access to profile page when not logged in', async ({ page }) => {
    // Navigate directly to the profile page without logging in
    await page.goto('http://localhost:3000/user/profile');

    // Validate that the user is redirected to the "404" page or not found page
    await expect(page.locator('text=404')).toBeVisible(); // Validate the "404" message
    await expect(page.locator('text=This page could not be found')).toBeVisible();

    // Optional: Validate that the URL matches the expected "notfound" route
    await expect(page).toHaveURL(/.*notfound/);
  });

  test('should restrict access to articles page when not logged in', async ({ page }) => {
    // Navigate directly to the articles page without logging in
    await page.goto('http://localhost:3000/user/articles');

    // Validate that the user is redirected to the "404" page or not found page
    await expect(page.locator('text=404')).toBeVisible(); // Validate the "404" message
    await expect(page.locator('text=This page could not be found')).toBeVisible();

    // Optional: Validate that the URL matches the expected "notfound" route
    await expect(page).toHaveURL(/.*notfound/);
  });
});

test.describe("Articles Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Log in before tests
    await page.goto("http://localhost:3000/user/login");
    await page.fill('input[placeholder="Enter your email"]', "test@example.com");
    await page.fill('input[placeholder="Enter your password"]', "password123");
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page).toHaveURL("http://localhost:3000/user/profile");
  });

  test("should show only the user's articles", async ({ page }) => {
    await page.goto("http://localhost:3000/user/articles");

    // Check that articles belong to the logged-in user
    const articles = await page.locator(".article-title").allTextContents();
    expect(articles).not.toContain("Other User's Article");
  });
});
