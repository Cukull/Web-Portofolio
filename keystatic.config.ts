import { config, fields, collection, singleton } from '@keystatic/core';

const isProd = import.meta.env.PROD;

const requiredText = (label: string) => fields.text({ label, validation: { isRequired: true } });

export default config({
  storage: isProd
    ? { kind: 'github', repo: 'Cukull/Web-Portofolio' }
    : { kind: 'local' },
  ui: {
    brand: {
      name: 'Portfolio CMS',
    },
  },
  collections: {
    certificates: collection({
      label: 'Certificates',
      slugField: 'title',
      path: 'src/content/certificates/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        issuer: requiredText('Issuer'),
        issueDate: requiredText('Issue Date'),
        description: fields.text({
          label: 'Short Description (Optional)',
          multiline: true,
          description: 'Tampil di kartu sertifikat. Kalau kosong, dipakai kalimat default.',
        }),
        pdfFile: fields.file({
          label: 'Certificate PDF (Optional)',
          description: 'Upload PDF sertifikat. Jika diisi, ini menjadi prioritas link.',
          directory: 'public/files/certificates',
          publicPath: '/files/certificates',
          validation: { isRequired: false },
        }),
        credentialUrl: fields.url({
          label: 'Credential URL',
          description: 'Link verifikasi sertifikat jika tidak upload PDF.',
          validation: { isRequired: false },
        }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'public/images/certificates',
          publicPath: '/images/certificates',
          validation: { isRequired: false },
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Notes (Optional)', extension: 'md' }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        problem: fields.text({ label: 'Problem', multiline: true }),
        solution: fields.text({ label: 'Solution', multiline: true }),
        result: fields.text({ label: 'Result', multiline: true }),
        technology: fields.array(fields.text({ label: 'Tech Name' }), {
          label: 'Technology Stack',
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
          validation: { isRequired: false },
        }),
        liveUrl: fields.url({
          label: 'Live / Demo URL',
          validation: { isRequired: false },
        }),
        githubUrl: fields.url({
          label: 'GitHub / Repository URL',
          validation: { isRequired: false },
        }),
        featured: fields.checkbox({ label: 'Featured Project', defaultValue: false }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Case Study / Detail', extension: 'md' }),
      },
    }),

    experience: collection({
      label: 'Experience',
      slugField: 'company',
      path: 'src/content/experience/*',
      format: { contentField: 'content' },
      schema: {
        company: fields.slug({ name: { label: 'Company Name' } }),
        position: requiredText('Position'),
        startDate: requiredText('Start Date'),
        endDate: fields.text({ label: 'End Date (or empty for Present)' }),
        location: fields.text({ label: 'Location' }),
        type: fields.select({
          label: 'Employment Type',
          options: [
            { label: 'Full-time', value: 'Full-time' },
            { label: 'Part-time', value: 'Part-time' },
            { label: 'Freelance', value: 'Freelance' },
            { label: 'Internship', value: 'Internship' },
            { label: 'Contract', value: 'Contract' },
            { label: 'Academic', value: 'Academic' },
          ],
          defaultValue: 'Full-time',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Description & Bullet Points', extension: 'md' }),
      },
    }),

    education: collection({
      label: 'Education',
      slugField: 'institution',
      path: 'src/content/education/*',
      format: { contentField: 'content' },
      schema: {
        institution: fields.slug({ name: { label: 'Institution' } }),
        degree: requiredText('Degree / Level'),
        field: requiredText('Field of Study'),
        startDate: requiredText('Start Year'),
        endDate: requiredText('End Year'),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Note (Optional)', extension: 'md' }),
      },
    }),
  },

  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'src/content/singletons/site',
      format: { data: 'json' },
      schema: {
        name: requiredText('Full Name'),
        shortName: requiredText('Short Name / Brand'),
        title: requiredText('SEO Title'),
        loaderText: fields.text({ label: 'Loading Screen Text', defaultValue: 'LOADING' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        url: fields.url({ label: 'Website URL' }),
        ogImage: fields.image({
          label: 'Open Graph Image',
          directory: 'public/images',
          publicPath: '/images',
          validation: { isRequired: false },
        }),
        author: fields.object(
          {
            name: requiredText('Name'),
            jobTitle: requiredText('Job Title'),
            location: requiredText('Location'),
          },
          { label: 'Author (JSON-LD)' },
        ),
        social: fields.object(
          {
            github: fields.url({ label: 'GitHub URL' }),
            linkedin: fields.url({ label: 'LinkedIn URL' }),
            instagram: fields.url({ label: 'Instagram URL' }),
            emailAddress: fields.text({ label: 'Email address' }),
          },
          { label: 'Social Links' },
        ),
        resumeFile: fields.file({
          label: 'CV / Resume File (PDF)',
          directory: 'public/files',
          publicPath: '/files',
          validation: { isRequired: false },
        }),
        resumeUrl: fields.text({
          label: 'CV URL fallback',
          description: 'Dipakai jika belum upload file CV.',
        }),
        music: fields.object(
          {
            src: fields.file({
              label: 'Audio File',
              description: 'Upload MP3/WAV/OGG. File baru otomatis dipakai widget musik.',
              directory: 'public/audio',
              publicPath: '/audio',
              validation: { isRequired: false },
            }),
            title: fields.text({ label: 'Song Title' }),
            artist: fields.text({ label: 'Artist' }),
            playingLabel: fields.text({ label: 'Playing Label', defaultValue: 'playing' }),
            pausedLabel: fields.text({ label: 'Paused Label', defaultValue: 'paused' }),
            volume: fields.number({
              label: 'Volume (0–1)',
              defaultValue: 0.35,
              validation: { min: 0, max: 1 },
            }),
            autoplay: fields.checkbox({ label: 'Autoplay', defaultValue: true }),
          },
          { label: 'Music Widget' },
        ),
        navigation: fields.array(
          fields.object({
            label: requiredText('Label'),
            href: requiredText('Href'),
          }),
          {
            label: 'Navigation',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
      },
    }),

    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/singletons/hero',
      format: { data: 'json' },
      schema: {
        headline: fields.text({ label: 'Headline (one line per row)', multiline: true }),
        subheadline: fields.text({
          label: 'Intro / Lede',
          multiline: true,
          description: 'Bungkus bagian yang ingin distabilo dengan **dua bintang**.',
        }),
        statusLabel: fields.text({ label: 'Status Label' }),
        location: fields.text({ label: 'Location' }),
        handIntro: fields.text({ label: 'Handwritten intro (e.g. my name is)' }),
        roleLabel: fields.text({ label: 'Role Chip (e.g. Web Developer)' }),
        masthead: fields.object(
          {
            currentlyLabel: fields.text({ label: 'Currently Label' }),
            currently: fields.text({ label: 'Currently Value' }),
            sinceLabel: fields.text({ label: 'Since Label' }),
            since: fields.text({ label: 'Since Value' }),
            focusLabel: fields.text({ label: 'Focus Label' }),
            focus: fields.text({ label: 'Focus Value' }),
          },
          { label: 'Masthead' },
        ),
        primaryCtaLabel: fields.text({ label: 'Primary CTA Label' }),
        secondaryCtaLabel: fields.text({ label: 'Secondary CTA Label' }),
        secondaryCtaHref: fields.text({ label: 'Secondary CTA Link' }),
        portrait: fields.image({
          label: 'Portrait Image',
          directory: 'public/images',
          publicPath: '/images',
          validation: { isRequired: false },
        }),
        portraitAlt: fields.text({ label: 'Portrait Alt Text' }),
        portraitMeta: fields.text({ label: 'Portrait Caption' }),
        note: fields.text({ label: 'Sticky Note' }),
        stats: fields.array(
          fields.object({
            number: fields.integer({ label: 'Number' }),
            suffix: fields.text({ label: 'Suffix' }),
            label: requiredText('Label'),
          }),
          {
            label: 'Hero Stats',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        marquee: fields.array(fields.text({ label: 'Item' }), {
          label: 'Technology Marquee',
          itemLabel: (props) => props.value,
        }),
      },
    }),

    about: singleton({
      label: 'About Section',
      path: 'src/content/singletons/about',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        lead: fields.text({ label: 'Lead Paragraph', multiline: true }),
        paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Paragraphs',
          itemLabel: (props) => props.value,
        }),
        handNote: fields.text({ label: 'Handwritten Note', multiline: true }),
        skillGroups: fields.array(
          fields.object({
            title: requiredText('Group Title'),
            items: fields.array(fields.text({ label: 'Skill' }), {
              label: 'Skills',
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: 'Skill Cards',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      },
    }),

    experienceSection: singleton({
      label: 'Experience Section',
      path: 'src/content/singletons/experience-section',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        railNote: fields.text({ label: 'Rail Note' }),
        presentLabel: fields.text({ label: 'Present Label' }),
      },
    }),

    projectsSection: singleton({
      label: 'Projects Section',
      path: 'src/content/singletons/projects-section',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        filterAll: fields.text({ label: 'Filter ALL Label' }),
        filterModern: fields.text({ label: 'Filter Astro & React Label' }),
        filterVanilla: fields.text({ label: 'Filter Web & Network Label' }),
        emptyText: fields.text({ label: 'Empty State Text', multiline: true }),
        cardVisit: fields.text({ label: 'Card Visit Label', defaultValue: 'VISIT SITE' }),
        cardDetails: fields.text({ label: 'Card Details Label', defaultValue: 'MORE DETAILS' }),
        detailEyebrow: fields.text({ label: 'Detail Eyebrow', defaultValue: 'PROJECT CASE STUDY' }),
        detailBack: fields.text({ label: 'Detail Back Link', defaultValue: 'BACK TO PROJECTS' }),
        detailProblem: fields.text({ label: 'Problem Heading', defaultValue: 'Problem' }),
        detailSolution: fields.text({ label: 'Solution Heading', defaultValue: 'Solution' }),
        detailResult: fields.text({ label: 'Result Heading', defaultValue: 'Result' }),
        detailLive: fields.text({ label: 'Live Link Label', defaultValue: 'VISIT SITE' }),
        detailRepo: fields.text({ label: 'Repository Link Label', defaultValue: 'VIEW REPOSITORY' }),
      },
    }),

    toolkit: singleton({
      label: 'Toolkit Section',
      path: 'src/content/singletons/toolkit',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        lede: fields.text({ label: 'Lede', multiline: true }),
        groups: fields.array(
          fields.object({
            label: requiredText('Group Label'),
            items: fields.array(
              fields.object({
                name: requiredText('Name'),
                use: fields.text({ label: 'Use / Description' }),
              }),
              {
                label: 'Items',
                itemLabel: (props) => props.fields.name.value,
              },
            ),
          }),
          {
            label: 'Tool Groups',
            itemLabel: (props) => props.fields.label.value,
          },
        ),
        handNote: fields.text({ label: 'Handwritten Note' }),
        stickyNote: fields.text({ label: 'Sticky Note' }),
      },
    }),

    educationSection: singleton({
      label: 'Education Section',
      path: 'src/content/singletons/education-section',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        railNote: fields.text({ label: 'Rail Note' }),
        stampText: fields.text({ label: 'Stamp Text' }),
        awardsTitle: fields.text({ label: 'Awards Title' }),
        awards: fields.array(fields.text({ label: 'Award', multiline: true }), {
          label: 'Awards',
          itemLabel: (props) => props.value,
        }),
        stickyNote: fields.text({ label: 'Sticky Note' }),
      },
    }),

    certificatesSection: singleton({
      label: 'Certificates Section',
      path: 'src/content/singletons/certificates-section',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        railNote: fields.text({ label: 'Rail Note' }),
        linkLabel: fields.text({ label: 'Credential Link Label', defaultValue: 'VIEW CREDENTIAL' }),
        notesLabel: fields.text({ label: 'Notes Summary Label', defaultValue: 'Catatan' }),
      },
    }),

    offClock: singleton({
      label: 'Off the Clock Section',
      path: 'src/content/singletons/off-clock',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        lede: fields.text({ label: 'Lede', multiline: true }),
        cards: fields.array(
          fields.object({
            name: requiredText('Name'),
            sub: fields.text({ label: 'Subtitle' }),
            note: fields.text({ label: 'Note', multiline: true }),
            freq: fields.text({ label: 'Frequency' }),
          }),
          {
            label: 'Hobby Cards',
            itemLabel: (props) => props.fields.name.value,
          },
        ),
        readsTitle: fields.text({ label: 'Reads Title' }),
        reads: fields.array(
          fields.object({
            book: requiredText('Book / Title'),
            who: fields.text({ label: 'Author / Creator' }),
            why: fields.text({ label: 'Why / Note', multiline: true }),
          }),
          {
            label: 'Reading List',
            itemLabel: (props) => props.fields.book.value,
          },
        ),
        marquee: fields.array(fields.text({ label: 'Item' }), {
          label: 'Blue Marquee',
          itemLabel: (props) => props.value,
        }),
      },
    }),

    contact: singleton({
      label: 'Contact Section',
      path: 'src/content/singletons/contact',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Heading' }),
        lede: fields.text({ label: 'Lede', multiline: true }),
        stickyNote: fields.text({ label: 'Sticky Note' }),
        finePrint: fields.text({
          label: 'Fine Print',
          multiline: true,
          description: 'Bisa memakai {year} dan {name}.',
        }),
        form: fields.object(
          {
            nameLabel: fields.text({ label: 'Name Label' }),
            namePlaceholder: fields.text({ label: 'Name Placeholder' }),
            emailLabel: fields.text({ label: 'Email Label' }),
            emailPlaceholder: fields.text({ label: 'Email Placeholder' }),
            messageLabel: fields.text({ label: 'Message Label' }),
            messagePlaceholder: fields.text({ label: 'Message Placeholder' }),
            submitLabel: fields.text({ label: 'Submit Button' }),
            sendingLabel: fields.text({ label: 'Sending Button' }),
            cvLabel: fields.text({ label: 'CV Button Label' }),
            successMessage: fields.text({ label: 'Success Message' }),
            copyLabel: fields.text({ label: 'Copy Button' }),
            copiedLabel: fields.text({ label: 'Copied Status' }),
          },
          { label: 'Form Labels' },
        ),
        socialLabels: fields.object(
          {
            linkedin: fields.text({ label: 'LinkedIn Label', defaultValue: 'LinkedIn' }),
            github: fields.text({ label: 'GitHub Label', defaultValue: 'GitHub' }),
            instagram: fields.text({ label: 'Instagram Label', defaultValue: 'Instagram' }),
            email: fields.text({ label: 'Email Label', defaultValue: 'Email' }),
          },
          { label: 'Social Link Labels' },
        ),
      },
    }),
  },
});
