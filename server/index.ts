import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Pool } from 'pg'

// Load environment variables
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/jobportal',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Test database connection on startup
pool.on('error', (err) => {
  console.error('[Database] Connection error:', err)
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Error handling middleware (must be last)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', {
    message: err.message,
    status: err.status || 500,
    path: req.path,
    method: req.method,
    stack: err.stack,
  })
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
  })
})

// ==================== VACANCIES ROUTES ====================

// Get all vacancies with filters
app.get('/api/vacancies', async (req: Request, res: Response) => {
  try {
    const { search, location, employmentType, experienceLevel, salaryMin, salaryMax } = req.query

    let query = `
      SELECT v.*, c.name as company_name, c.logo as company_logo
      FROM vacancies v
      JOIN companies c ON v.company_id = c.id
      WHERE v.is_active = true
    `
    const params: any[] = []

    if (search) {
      query += ` AND (v.title ILIKE $${params.length + 1} OR v.description ILIKE $${params.length + 1})`
      params.push(`%${search}%`)
    }

    if (location) {
      query += ` AND v.location ILIKE $${params.length + 1}`
      params.push(`%${location}%`)
    }

    if (employmentType) {
      query += ` AND v.employment_type = $${params.length + 1}`
      params.push(employmentType)
    }

    if (experienceLevel) {
      query += ` AND v.experience_level = $${params.length + 1}`
      params.push(experienceLevel)
    }

    if (salaryMin) {
      query += ` AND v.salary_max >= $${params.length + 1}`
      params.push(parseInt(salaryMin as string))
    }

    if (salaryMax) {
      query += ` AND v.salary_min <= $${params.length + 1}`
      params.push(parseInt(salaryMax as string))
    }

    query += ' ORDER BY v.created_at DESC LIMIT 100'

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error: any) {
    console.error('Error fetching vacancies:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get single vacancy
app.get('/api/vacancies/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `SELECT v.*, c.name as company_name, c.logo as company_logo, c.website, c.location as company_location,
              c.description as company_description, c.rating as company_rating
       FROM vacancies v
       JOIN companies c ON v.company_id = c.id
       WHERE v.id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vacancy not found' })
    }

    // Increment views
    await pool.query('UPDATE vacancies SET views_count = views_count + 1 WHERE id = $1', [id])

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Error fetching vacancy:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create vacancy (employer only)
app.post('/api/vacancies', async (req: Request, res: Response) => {
  try {
    const { company_id, title, description, salary_min, salary_max, employment_type, experience_level, location, skills_required } = req.body

    const result = await pool.query(
      `INSERT INTO vacancies (company_id, title, description, salary_min, salary_max, employment_type, experience_level, location, skills_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [company_id, title, description, salary_min, salary_max, employment_type, experience_level, location, skills_required || []]
    )

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Error creating vacancy:', error)
    res.status(500).json({ error: error.message })
  }
})

// Update vacancy
app.put('/api/vacancies/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, salary_min, salary_max, employment_type, experience_level, location, is_active } = req.body

    const result = await pool.query(
      `UPDATE vacancies 
       SET title = $1, description = $2, salary_min = $3, salary_max = $4, 
           employment_type = $5, experience_level = $6, location = $7, is_active = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [title, description, salary_min, salary_max, employment_type, experience_level, location, is_active, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vacancy not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Error updating vacancy:', error)
    res.status(500).json({ error: error.message })
  }
})

// ==================== APPLICATIONS ROUTES ====================

// Get applications for job seeker or vacancy
app.get('/api/applications', async (req: Request, res: Response) => {
  try {
    const { job_seeker_id, vacancy_id } = req.query

    let query = `
      SELECT a.*, v.title as vacancy_title, js.id as job_seeker_id, u.first_name, u.last_name, u.email
      FROM applications a
      JOIN vacancies v ON a.vacancy_id = v.id
      JOIN job_seekers js ON a.job_seeker_id = js.id
      JOIN users u ON js.user_id = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (job_seeker_id) {
      query += ` AND a.job_seeker_id = $${params.length + 1}`
      params.push(job_seeker_id)
    }

    if (vacancy_id) {
      query += ` AND a.vacancy_id = $${params.length + 1}`
      params.push(vacancy_id)
    }

    query += ' ORDER BY a.created_at DESC'

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error: any) {
    console.error('Error fetching applications:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create application
app.post('/api/applications', async (req: Request, res: Response) => {
  try {
    const { vacancy_id, job_seeker_id, resume_id, cover_letter } = req.body

    // Check if already applied
    const existingApp = await pool.query(
      'SELECT id FROM applications WHERE vacancy_id = $1 AND job_seeker_id = $2',
      [vacancy_id, job_seeker_id]
    )

    if (existingApp.rows.length > 0) {
      return res.status(400).json({ error: 'Already applied to this vacancy' })
    }

    const result = await pool.query(
      `INSERT INTO applications (vacancy_id, job_seeker_id, resume_id, cover_letter, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [vacancy_id, job_seeker_id, resume_id, cover_letter]
    )

    // Increment applications count
    await pool.query('UPDATE vacancies SET applications_count = applications_count + 1 WHERE id = $1', [vacancy_id])

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Error creating application:', error)
    res.status(500).json({ error: error.message })
  }
})

// Update application status
app.put('/api/applications/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const result = await pool.query(
      `UPDATE applications 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Error updating application:', error)
    res.status(500).json({ error: error.message })
  }
})

// ==================== SAVED JOBS ROUTES ====================

// Get saved jobs
app.get('/api/saved-jobs/:jobSeekerId', async (req: Request, res: Response) => {
  try {
    const { jobSeekerId } = req.params

    const result = await pool.query(
      `SELECT sj.id, v.*
       FROM saved_jobs sj
       JOIN vacancies v ON sj.vacancy_id = v.id
       WHERE sj.job_seeker_id = $1
       ORDER BY sj.created_at DESC`,
      [jobSeekerId]
    )

    res.json(result.rows)
  } catch (error: any) {
    console.error('Error fetching saved jobs:', error)
    res.status(500).json({ error: error.message })
  }
})

// Save/unsave job
app.post('/api/saved-jobs/:jobSeekerId/:vacancyId', async (req: Request, res: Response) => {
  try {
    const { jobSeekerId, vacancyId } = req.params

    const exists = await pool.query(
      'SELECT id FROM saved_jobs WHERE job_seeker_id = $1 AND vacancy_id = $2',
      [jobSeekerId, vacancyId]
    )

    if (exists.rows.length > 0) {
      // Delete if exists
      await pool.query('DELETE FROM saved_jobs WHERE job_seeker_id = $1 AND vacancy_id = $2', [jobSeekerId, vacancyId])
      res.json({ saved: false })
    } else {
      // Create if not exists
      await pool.query(
        'INSERT INTO saved_jobs (job_seeker_id, vacancy_id) VALUES ($1, $2)',
        [jobSeekerId, vacancyId]
      )
      res.json({ saved: true })
    }
  } catch (error: any) {
    console.error('Error toggling saved job:', error)
    res.status(500).json({ error: error.message })
  }
})

// ==================== COMPANIES ROUTES ====================

// Get company details
app.get('/api/companies/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      `SELECT c.*, (SELECT COUNT(*) FROM vacancies WHERE company_id = c.id AND is_active = true) as active_vacancies
       FROM companies c
       WHERE c.id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' })
    }

    res.json(result.rows[0])
  } catch (error: any) {
    console.error('Error fetching company:', error)
    res.status(500).json({ error: error.message })
  }
})

// ==================== HEALTH CHECK ====================

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Test database connection
    const result = await pool.query('SELECT NOW()')
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
    })
  } catch (error: any) {
    console.error('[Health Check] Database error:', error)
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
    })
  }
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  })
})

// Start server
const server = app.listen(port, () => {
  console.log(`[API Server] ✓ Running on http://localhost:${port}`)
  console.log(`[API Server] ✓ Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`[API Server] ✓ Database: ${process.env.DATABASE_URL ? 'configured' : 'NOT CONFIGURED'}`)
  console.log(`[API Server] ✓ Health check: http://localhost:${port}/api/health`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[API Server] SIGTERM received, shutting down gracefully...')
  server.close(() => {
    console.log('[API Server] Server closed')
    pool.end()
    process.exit(0)
  })
})
