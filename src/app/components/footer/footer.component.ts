import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterLink {
  label: string;
  href:  string;
}

interface FooterColumn {
  heading: string;
  links:   FooterLink[];
}

/**
 * FooterComponent
 * Site footer with columns, social links, legal text, and contact info.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly columns: FooterColumn[] = [
    {
      heading: 'The Platform',
      links: [
        { label: 'Features',       href: '#features'  },
        { label: 'Benefits',       href: '#benefits'  },
        { label: 'Request a Demo', href: '#demo'      },
        { label: 'Contact Us',     href: '#contact'   },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Us',       href: '#about'     },
        { label: 'Privacy Policy', href: '#privacy'   },
        { label: 'Terms of Service', href: '#terms'   },
      ],
    },
  ];

  readonly socials = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>`,
    },
    {
      label: 'Twitter / X',
      href: '#',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>`,
    },
    {
      label: 'Instagram',
      href: '#',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>`,
    },
  ];
}
