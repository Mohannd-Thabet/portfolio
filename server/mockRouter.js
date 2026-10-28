import express from 'express';
import upload from './middleware/uploadMiddleware.js';
import {
  mockProfile,
  mockSkills,
  mockProjects,
  mockCertificates,
  mockMessages,
} from './mockData.js';

const mockRouter = express.Router();

let currentProfile = { ...mockProfile };
let currentSkills = [...mockSkills];
let currentProjects = [...mockProjects];
let currentCertificates = [...mockCertificates];
let currentMessages = [...mockMessages];
let totalVisits = 142;

const fileToDataUrl = (file) => {
  if (!file) return null;
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

// Profile
mockRouter.get('/profile', (req, res) => {
  res.status(200).json(currentProfile);
});

mockRouter.patch('/profile', upload.any(), (req, res) => {
  const body = req.body || {};
  const {
    name,
    title,
    subtitle,
    about,
    email,
    linkedin,
    github,
    university,
    graduation,
  } = body;

  if (name) currentProfile.name = name;
  if (title) currentProfile.title = title;
  if (subtitle) currentProfile.subtitle = subtitle;
  if (about) currentProfile.about = about;
  if (email) currentProfile.email = email;
  if (linkedin) currentProfile.linkedin = linkedin;
  if (github) currentProfile.github = github;
  if (university) currentProfile.university = university;
  if (graduation !== undefined) currentProfile.graduation = Number(graduation);

  const imageFile = req.files?.find((f) => f.fieldname === 'image');
  if (imageFile) {
    currentProfile.image = {
      url: fileToDataUrl(imageFile),
      public_id: `img_${Date.now()}`,
    };
  }

  const cvFile = req.files?.find((f) => f.fieldname === 'cv');
  if (cvFile) {
    currentProfile.cv = {
      url: fileToDataUrl(cvFile),
      public_id: `cv_${Date.now()}`,
    };
  }

  res.status(200).json(currentProfile);
});

// Projects
mockRouter.get('/projects', (req, res) => {
  res.status(200).json(currentProjects);
});

mockRouter.get('/projects/:id', (req, res) => {
  const project = currentProjects.find((p) => p._id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.status(200).json(project);
});

mockRouter.post('/projects', upload.any(), (req, res) => {
  let parsedTags = [];
  try {
    parsedTags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags || [];
  } catch {
    parsedTags = [req.body.tags];
  }

  const imageFile = req.files?.find((f) => f.fieldname === 'image');
  const imageUrl = imageFile
    ? fileToDataUrl(imageFile)
    : 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80';

  const newProject = {
    _id: `project-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    description: req.body.description || '',
    tags: parsedTags,
    image: { url: imageUrl, public_id: `proj_${Date.now()}` },
    githubUrl: req.body.githubUrl || '',
    liveUrl: req.body.liveUrl || '',
    featured: req.body.featured === 'true' || req.body.featured === true,
    order: Number(req.body.order) || currentProjects.length + 1,
  };

  currentProjects.push(newProject);
  res.status(201).json(newProject);
});

mockRouter.patch('/projects/:id', upload.any(), (req, res) => {
  const index = currentProjects.findIndex((p) => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });

  let parsedTags = currentProjects[index].tags;
  if (req.body.tags) {
    try {
      parsedTags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
    } catch {
      parsedTags = [req.body.tags];
    }
  }

  const imageFile = req.files?.find((f) => f.fieldname === 'image');
  const imageUrl = imageFile ? fileToDataUrl(imageFile) : currentProjects[index].image?.url;

  currentProjects[index] = {
    ...currentProjects[index],
    title: req.body.title ?? currentProjects[index].title,
    description: req.body.description ?? currentProjects[index].description,
    tags: parsedTags,
    image: { url: imageUrl, public_id: currentProjects[index].image?.public_id || `proj_${Date.now()}` },
    githubUrl: req.body.githubUrl ?? currentProjects[index].githubUrl,
    liveUrl: req.body.liveUrl ?? currentProjects[index].liveUrl,
    featured: req.body.featured !== undefined ? req.body.featured === 'true' || req.body.featured === true : currentProjects[index].featured,
    order: req.body.order !== undefined ? Number(req.body.order) : currentProjects[index].order,
  };

  res.status(200).json(currentProjects[index]);
});

mockRouter.delete('/projects/:id', (req, res) => {
  currentProjects = currentProjects.filter((p) => p._id !== req.params.id);
  res.status(200).json({ message: 'Project deleted successfully' });
});

// Skills
mockRouter.get('/skills', (req, res) => {
  res.status(200).json(currentSkills);
});

mockRouter.get('/skills/:id', (req, res) => {
  const skill = currentSkills.find((s) => s._id === req.params.id);
  if (!skill) return res.status(404).json({ message: 'Skill not found' });
  res.status(200).json(skill);
});

mockRouter.post('/skills', (req, res) => {
  const newSkill = {
    _id: `skill-${Date.now()}`,
    name: req.body.name,
    type: req.body.type,
    icon: req.body.icon,
    order: Number(req.body.order) || currentSkills.length + 1,
  };
  currentSkills.push(newSkill);
  res.status(201).json(newSkill);
});

mockRouter.patch('/skills/:id', (req, res) => {
  const index = currentSkills.findIndex((s) => s._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Skill not found' });
  currentSkills[index] = { ...currentSkills[index], ...req.body };
  res.status(200).json(currentSkills[index]);
});

mockRouter.delete('/skills/:id', (req, res) => {
  currentSkills = currentSkills.filter((s) => s._id !== req.params.id);
  res.status(200).json({ message: 'Skill deleted successfully' });
});

// Certificates
mockRouter.get('/certificates', (req, res) => {
  res.status(200).json(currentCertificates);
});

mockRouter.get('/certificates/:id', (req, res) => {
  const cert = currentCertificates.find((c) => c._id === req.params.id);
  if (!cert) return res.status(404).json({ message: 'Certificate not found' });
  res.status(200).json(cert);
});

mockRouter.post('/certificates', upload.any(), (req, res) => {
  const files = req.files || [];
  const images = files.length > 0
    ? files.map((f, i) => ({ url: fileToDataUrl(f), public_id: `cert_img_${Date.now()}_${i}` }))
    : [{ url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80', public_id: 'cert_1' }];

  const newCert = {
    _id: `cert-${Date.now()}`,
    title: req.body.title || 'Certificate',
    issuer: req.body.issuer || '',
    date: req.body.date || new Date().toISOString(),
    images,
  };

  currentCertificates.push(newCert);
  res.status(201).json(newCert);
});

mockRouter.patch('/certificates/:id', upload.any(), (req, res) => {
  const index = currentCertificates.findIndex((c) => c._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Certificate not found' });

  const files = req.files || [];
  let images = currentCertificates[index].images;
  if (files.length > 0) {
    images = files.map((f, i) => ({ url: fileToDataUrl(f), public_id: `cert_img_${Date.now()}_${i}` }));
  }

  currentCertificates[index] = {
    ...currentCertificates[index],
    title: req.body.title ?? currentCertificates[index].title,
    issuer: req.body.issuer ?? currentCertificates[index].issuer,
    date: req.body.date ?? currentCertificates[index].date,
    images,
  };

  res.status(200).json(currentCertificates[index]);
});

mockRouter.delete('/certificates/:id', (req, res) => {
  currentCertificates = currentCertificates.filter((c) => c._id !== req.params.id);
  res.status(200).json({ message: 'Certificate deleted successfully' });
});

// Visits
mockRouter.post('/visits', (req, res) => {
  totalVisits += 1;
  res.sendStatus(201);
});

mockRouter.get('/visits', (req, res) => {
  res.status(200).json({ total: totalVisits });
});

mockRouter.get('/visits/timeline', (req, res) => {
  const days = 14;
  const timeline = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    timeline.push({
      date: dateStr,
      count: Math.floor(Math.random() * 15) + 3,
    });
  }
  res.status(200).json(timeline);
});

// Messages
mockRouter.get('/messages', (req, res) => {
  res.status(200).json(currentMessages);
});

mockRouter.get('/messages/:id', (req, res) => {
  const msg = currentMessages.find((m) => m._id === req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.status(200).json(msg);
});

mockRouter.post('/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  const newMsg = {
    _id: `msg-${Date.now()}`,
    name,
    email,
    subject,
    message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  currentMessages.unshift(newMsg);
  res.status(201).json({ message: 'Message created successfully' });
});

mockRouter.patch('/messages/:id', (req, res) => {
  const msg = currentMessages.find((m) => m._id === req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  if (typeof req.body.isRead === 'boolean') {
    msg.isRead = req.body.isRead;
  }
  res.status(200).json(msg);
});

mockRouter.delete('/messages/:id', (req, res) => {
  currentMessages = currentMessages.filter((m) => m._id !== req.params.id);
  res.status(200).json({ message: 'Message deleted successfully' });
});

// Auth Login
mockRouter.post('/auth/login', (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    _id: 'mock-admin-id',
    email: email || 'admin@portfolio.com',
    token: 'mock-jwt-token-demo-mode',
  });
});

export default mockRouter;
