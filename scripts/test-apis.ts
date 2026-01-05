
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

async function testApis() {
  try {
    const connectDB = (await import('../lib/db')).default
    const Item = (await import('../lib/models/Item')).default
    const { createItem, getItems, deleteItem } = await import('../app/actions')
    
    // Mock the auth function since we can't easily mock next-auth in a script
    // We will bypass the requireAdmin check by testing the MODEL directly for now,
    // OR we can rely on the fact that we are running this in a trusted environment.
    // However, the actions check `auth()`. 
    // Testing actions directly in a script is hard because of `auth()`.
    
    // Instead, let's test the Model operations directly to ensure DB connectivity and Schema.
    console.log('Testing Database and Models...')
    await connectDB()
    
    const testTitle = 'Test Item ' + Date.now()
    
    // 1. Create
    console.log('1. Creating Item...')
    const newItem = await Item.create({
        title: testTitle,
        slug: 'test-item-' + Date.now(),
        description: 'This is a test item',
        collection: 'artificial-flowers',
        images: ['http://example.com/image.jpg'],
        price: 99.99
    })
    console.log('✓ Item created:', newItem._id)

    // 2. Read
    console.log('2. Reading Items...')
    const items = await Item.find({ title: testTitle })
    if (items.length > 0) {
        console.log(`✓ Found ${items.length} items`)
    } else {
        throw new Error('Item not found')
    }

    // 3. Delete
    console.log('3. Deleting Item...')
    await Item.findByIdAndDelete(newItem._id)
    console.log('✓ Item deleted')

    console.log('API/Model Tests Passed!')
    process.exit(0)
  } catch (error) {
    console.error('Test Failed:', error)
    process.exit(1)
  }
}

testApis()
