import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@storytide.com' },
    update: {},
    create: {
      email: 'demo@storytide.com',
      name: 'System Admin',
      password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', // SHA256 hash of '123'
    },
  })

  console.log('✓ Created demo user:', demoUser.email)

  // Sample blog posts
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

Join us in revolutionizing the blogging experience. Welcome to the future of storytelling.`,
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

The result is a robust, scalable architecture capable of supporting modern web applications while maintaining developer sanity and user satisfaction.`,
    },
    {
      title: 'The Art of Minimalist Design in Developer Tools',
      content: `Minimalism in developer tools isn't just an aesthetic choice—it's a philosophy that prioritizes functionality, clarity, and efficiency. When done right, minimalist design disappears, leaving only pure functionality.

Terminal Aesthetics
The terminal interface has captivated developers for decades. Its appeal lies in:
- High contrast for readability
- Monospace fonts for code alignment
- Keyboard-first navigation
- Distraction-free environment
- Nostalgic connection to computing history

Color Theory in Developer Tools
Our terminal theme uses a carefully selected palette:
- Primary green (#00ff41) for important elements
- Dimmed green (#00cc33) for secondary information
- Dark backgrounds (#111111) to reduce eye strain
- Strategic use of glow effects for emphasis

Typography Matters
Monospace fonts serve a functional purpose beyond aesthetics:
- Consistent character width aids code alignment
- Clear distinction between similar characters (0 vs O, 1 vs l)
- Reduced cognitive load when reading code
- Better scanning for specific patterns

Whitespace as a Design Element
Proper spacing improves comprehension:
- Line height affects readability
- Margins separate logical sections
- Padding creates visual breathing room
- Negative space guides attention

Interactive Elements
Buttons and inputs should:
- Provide clear visual feedback
- Maintain consistent styling
- Use familiar patterns (^O for Write, ^X for Exit)
- Support keyboard shortcuts

The goal isn't to remove features, but to present them in their simplest, most intuitive form. Every pixel should serve a purpose. Every interaction should feel natural. This is the essence of minimalist design in developer tools.`,
    },
    {
      title: 'Building Scalable Applications with TypeScript',
      content: `TypeScript has transformed JavaScript development by adding static typing, enabling developers to catch errors before runtime and creating more maintainable codebases.

Why TypeScript?
- Early error detection through type checking
- Enhanced IDE support and autocompletion
- Self-documenting code through type annotations
- Easier refactoring with confidence
- Better collaboration in team environments

Type Safety Across the Stack
Frontend Benefits:
Component props are validated at compile time, preventing common bugs. Hooks and state management become more predictable with explicit types.

Backend Advantages:
API endpoints can share types with frontend consumers, ensuring contract consistency. Database models translate directly to TypeScript interfaces.

Shared Type Libraries:
Creating a common package for types ensures consistency:

\`\`\`typescript
// Common schema validation
const userSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
})
\`\`\`

Best Practices
1. Use strict mode for maximum type safety
2. Leverage utility types for DRY code
3. Avoid 'any' unless absolutely necessary
4. Use discriminated unions for complex state
5. Generate types from your API schemas

Performance Considerations
TypeScript adds no runtime overhead—types are stripped during compilation. The trade-off is compile-time checking for runtime reliability.

Tooling Integration
- ESLint with TypeScript rules catches code quality issues
- Prettier handles formatting consistently
- Husky pre-commit hooks run type checks automatically
- CI/CD pipelines validate types before deployment

The investment in learning TypeScript pays dividends in reduced bugs, improved documentation, and enhanced developer experience. It's not just a language—it's a development methodology.`,
    },
  ]

  for (const blog of blogs) {
    const created = await prisma.post.create({
      data: {
        ...blog,
        authorId: demoUser.id,
        published: true,
      },
    })
    console.log('✓ Created blog:', created.title.substring(0, 50) + '...')
  }

  console.log('🎉 Database seeding completed successfully!')
  console.log(`Created ${blogs.length} sample blog posts`)
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
