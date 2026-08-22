import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
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
        issuer: fields.text({ label: 'Issuer' }),
        issueDate: fields.text({ label: 'Issue Date' }),
        pdfFile: fields.file({
          label: 'Certificate PDF (Optional)',
          description: 'Upload PDF sertifikat secara lokal (opsional). Jika diisi, ini akan menjadi prioritas link saat sertifikat diklik.',
          directory: 'public/files/certificates',
          publicPath: '/files/certificates',
        }),
        credentialUrl: fields.url({ label: 'Credential URL', description: 'Link to certificate verification (jika tidak upload PDF)' }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'public/images/certificates',
          publicPath: '/images/certificates',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Content (Description)', extension: 'md' }),
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
          itemLabel: props => props.value
        }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        featured: fields.checkbox({ label: 'Featured Project', defaultValue: false }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    experience: collection({
      label: 'Experience',
      slugField: 'company',
      path: 'src/content/experience/*',
      format: { contentField: 'content' },
      schema: {
        company: fields.slug({ name: { label: 'Company Name' } }),
        position: fields.text({ label: 'Position' }),
        startDate: fields.text({ label: 'Start Date' }),
        endDate: fields.text({ label: 'End Date (or Present)' }),
        location: fields.text({ label: 'Location' }),
        type: fields.select({
          label: 'Employment Type',
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Internship', value: 'internship' },
            { label: 'Contract', value: 'contract' }
          ],
          defaultValue: 'full-time',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Description', extension: 'md' }),
      },
    }),
    education: collection({
      label: 'Education',
      slugField: 'institution',
      path: 'src/content/education/*',
      format: { contentField: 'content' },
      schema: {
        institution: fields.slug({ name: { label: 'Institution' } }),
        degree: fields.text({ label: 'Degree' }),
        field: fields.text({ label: 'Field of Study' }),
        startDate: fields.text({ label: 'Start Date (Year)' }),
        endDate: fields.text({ label: 'End Date (Year)' }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        content: fields.markdoc({ label: 'Details', extension: 'md' }),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/singletons/hero',
      format: { data: 'json' },
      schema: {
        headline: fields.text({ label: 'Headline', multiline: true }),
        subheadline: fields.text({ label: 'Sub Headline', multiline: true }),
        statusLabel: fields.text({ label: 'Status Label (e.g. Available for work)' }),
        stats: fields.array(fields.object({
          number: fields.integer({ label: 'Number' }),
          suffix: fields.text({ label: 'Suffix' }),
          label: fields.text({ label: 'Label' }),
        }), { label: 'Hero Stats', itemLabel: props => props.fields.label.value }),
      }
    }),
    about: singleton({
      label: 'About Section',
      path: 'src/content/singletons/about',
      format: { data: 'json' },
      schema: {
        sectionLabel: fields.text({ label: 'Section Label' }),
        stats: fields.array(fields.object({
          number: fields.integer({ label: 'Number' }),
          suffix: fields.text({ label: 'Suffix' }),
          label: fields.text({ label: 'Label' }),
        }), { label: 'Stats List', itemLabel: props => props.fields.label.value }),
        testimonials: fields.array(fields.object({
          quote: fields.text({ label: 'Quote', multiline: true }),
          name: fields.text({ label: 'Name' }),
          designation: fields.text({ label: 'Designation' }),
          src: fields.text({ label: 'Image URL (Unsplash or path)' }),
        }), { label: 'Testimonials List', itemLabel: props => props.fields.name.value })
      }
    })
  }
});
