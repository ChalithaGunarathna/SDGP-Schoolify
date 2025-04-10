// // tests/unit/FooterSection.test.jsx
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { FooterSection } from '../../src/app/components/FooterSection.jsx';
// import { jest } from '@jest/globals';
//
// describe('FooterSection Component', () => {
//     test('renders the Schoolify link', () => {
//         render(<FooterSection />);
//         // Check that the Schoolify text is in the document
//         expect(screen.getByText('Schoolify')).toBeInTheDocument();
//     });
//
//     test('scrolls to top when Schoolify link is clicked', () => {
//         // Spy on window.scrollTo
//         const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
//         render(<FooterSection />);
//         const schoolifyLink = screen.getByText('Schoolify');
//         fireEvent.click(schoolifyLink);
//         expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
//         scrollToSpy.mockRestore();
//     });
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FooterSection } from '../../src/app/components/FooterSection.jsx';
import { jest } from '@jest/globals';

describe('FooterSection Component', () => {
    beforeEach(() => {
        // Mock scroll target
        const hero = document.createElement('div');
        hero.id = 'hero';
        document.body.appendChild(hero);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('renders the Schoolify logo image', () => {
        render(<FooterSection />);
        const logo = screen.getByAltText('Schoolify Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/img/logos/logowhite.png');
    });

    test('scrolls to #hero when "Go to the Top" is clicked', () => {
        const mockScroll = jest.fn();
        document.getElementById('hero').scrollIntoView = mockScroll;

        render(<FooterSection />);
        const topLink = screen.getByText('Go to the Top');
        fireEvent.click(topLink);

        expect(mockScroll).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });

    test('renders external marketing link', () => {
        render(<FooterSection />);
        const marketingLink = screen.getByText('Marketing');
        expect(marketingLink).toBeInTheDocument();
        expect(marketingLink.closest('a')).toHaveAttribute('href', 'https://www.getschoolify.com/');
    });

    test('renders social icons (LinkedIn, Facebook, Instagram)', () => {
        render(<FooterSection />);
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    });
});