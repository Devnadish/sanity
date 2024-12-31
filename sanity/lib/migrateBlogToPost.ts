import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '../env'

// Initialize the Sanity client with write permissions
const client = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to add this to your env variables
  apiVersion,
  useCdn: false
})

// Function to migrate a single blog document to a post
async function migrateBlogToPost(blogDoc: any) {
  const newPost = {
    _type: 'post',
    title: blogDoc.title,
    slug: blogDoc.slug,
    content: blogDoc.content,
    mainImage: blogDoc.mainImage,
    publishedAt: blogDoc.publishedAt,
    author: blogDoc.author,
    categories: blogDoc.categories,
    // Add any additional fields you want to migrate
  }

  try {
    // Create the new post document
    const result = await client.create(newPost)
    console.log(`Successfully migrated blog "${blogDoc.title}" to post`)
    
    // Delete the old blog document
    await client.delete(blogDoc._id)
    console.log(`Deleted old blog document: ${blogDoc._id}`)
    
    return result
  } catch (error) {
    console.error(`Failed to migrate blog "${blogDoc.title}":`, error)
    throw error
  }
}

// Function to migrate all blog documents
async function migrateAllBlogs() {
  try {
    // Fetch all documents of type 'blog'
    const blogDocs = await client.fetch('*[_type == "blog"]')
    console.log(`Found ${blogDocs.length} blog documents to migrate`)

    // Migrate each blog document
    for (const blogDoc of blogDocs) {
      await migrateBlogToPost(blogDoc)
    }

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Function to check for any remaining blog references
async function checkBlogReferences() {
  try {
    const references = await client.fetch(`
      *[references(*[_type == "blog"]._id)] {
        _id,
        _type,
        title
      }
    `)

    if (references.length > 0) {
      console.log('Found documents still referencing blogs:', references)
    } else {
      console.log('No remaining references to blog documents found')
    }
  } catch (error) {
    console.error('Error checking blog references:', error)
    throw error
  }
}

// Function to run the complete migration process
async function runMigration() {
  try {
    await migrateAllBlogs()
    await checkBlogReferences()
  } catch (error) {
    console.error('Migration process failed:', error)
    process.exit(1)
  }
}

// Only run if called directly (not imported)
if (require.main === module) {
  runMigration()
}