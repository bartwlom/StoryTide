#!/usr/bin/env node

import axios from 'axios';

// You'll need to sign in first to get a token
async function seedBlogsViaAPI() {
    console.log('🌱 Seeding blogs via API...');
    
    try {
        // Sign up to get token (or signin if exists)
        const email = 'admin@storytide.com';
        const password = 'password123';
        const name = 'Platform Admin';
        
        let token;
        try {
            // Try signup first
            const signupResponse = await axios.post(
                'https://storytide.blogging-web.workers.dev/api/v1/user/signup',
                { email, password, name }
            );
            token = signupResponse.data.jwt;
            console.log('✓ Created new user, got token:', token.substring(0, 20) + '...');
        } catch (signupError) {
            // User exists, sign in instead
            const signinResponse = await axios.post(
                'https://storytide.blogging-web.workers.dev/api/v1/user/signin',
                { email, password }
            );
            token = signinResponse.data.jwt;
            console.log('✓ Signed in existing user, got token:', token.substring(0, 20) + '...');
        }
        
        // Sample blogs to create
        const blogs = [
            {
                title: 'Welcome to StoryTide: A New Era of Digital Storytelling',
                content: `StoryTide represents the evolution of digital narrative platforms. Built on cutting-edge technology, it combines the nostalgia of terminal interfaces with modern web capabilities.

Our platform leverages Cloudflare Workers for lightning-fast edge computing, ensuring your stories load instantly regardless of geographic location. The backend utilizes Hono, a lightweight yet powerful framework designed for performance.

Key Features:
- Real-time publishing with instant global distribution
- Terminal-inspired UI for developers and tech enthusiasts
- Secure authentication using JWT tokens
- PostgreSQL database with Prisma ORM for reliable data persistence
- Responsive design that adapts to any screen size

The name "StoryTide" reflects our mission: to create a flowing current of stories, ideas, and knowledge that connects writers and readers across the digital landscape.

Whether you're a developer documenting your journey, a writer exploring new ideas, or a thinker sharing insights, StoryTide provides the perfect canvas for your digital narratives.

Join us in revolutionizing the blogging experience. Welcome to the future of storytelling.`
            },
            {
                title: 'Understanding Modern Web Architecture: A Deep Dive',
                content: `Modern web development has evolved dramatically from the early days of simple HTML pages. Today's applications require sophisticated architectures that can handle millions of users while maintaining performance and reliability.

The Foundation: Edge Computing
Edge computing brings computation closer to users, reducing latency and improving user experience. Cloudflare Workers exemplifies this approach, executing code at the edge of the network, mere milliseconds away from end users.

API Design Principles
RESTful APIs remain the backbone of web services. Our implementation uses Hono, which provides:
- Type-safe routing with TypeScript
- Middleware support for authentication and logging
- Minimal overhead for maximum performance
- Excellent developer experience with intuitive APIs

Database Considerations
PostgreSQL continues to dominate as the preferred relational database. Combined with Prisma ORM, developers gain:
- Type-safe database queries
- Automatic migration generation
- Intuitive schema definitions
- Connection pooling and optimization

Frontend Evolution
React 19 introduces concurrent rendering and server components, enabling:
- Smoother user interactions
- Better code splitting
- Improved SEO capabilities
- Enhanced developer productivity

Security Best Practices
- JWT-based authentication with proper token expiration
- Input validation using Zod schemas
- CORS configuration for controlled access
- Password hashing with SHA-256 or bcrypt

The result is a robust, scalable architecture capable of supporting modern web applications while maintaining developer sanity and user satisfaction.`
            }
        ];
        
        // Create each blog
        for (const blog of blogs) {
            const response = await axios.post(
                'https://storytide.blogging-web.workers.dev/api/v1/blog',
                blog,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('✓ Created blog:', blog.title.substring(0, 40) + '...');
        }
        
        console.log('\n🎉 Blogs seeded successfully via API!');
        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

seedBlogsViaAPI();
