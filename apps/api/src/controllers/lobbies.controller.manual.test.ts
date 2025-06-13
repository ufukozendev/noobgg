import { eq } from 'drizzle-orm';
import { db } from '../db';
import { lobbies } from '../db/schemas/lobbies.drizzle';

// Simple manual test functions for brute force testing
// Run these individually to test different scenarios

export async function testCreateLobby() {
  console.log('🧪 Testing Create Lobby...');
  
  const lobbyData = {
    gameId: BigInt(1),
    regionId: BigInt(1),
    modeId: BigInt(1),
    minTeamSize: 2,
    maxTeamSize: 5,
    type: 'public' as const,
    isMicRequired: false,
    creatorId: BigInt(1),
    ownerId: BigInt(1),
    note: 'Test lobby for manual testing'
  };

  try {
    const [created] = await db.insert(lobbies).values(lobbyData).returning();
    console.log('✅ Created lobby:', created);
    return created;
  } catch (error) {
    console.error('❌ Failed to create lobby:', error);
    throw error;
  }
}

export async function testGetAllLobbies() {
  console.log('🧪 Testing Get All Lobbies...');
  
  try {
    const allLobbies = await db.select().from(lobbies);
    console.log(`✅ Found ${allLobbies.length} lobbies:`, allLobbies);
    return allLobbies;
  } catch (error) {
    console.error('❌ Failed to get lobbies:', error);
    throw error;
  }
}

export async function testGetLobbyById(id: bigint) {
  console.log(`🧪 Testing Get Lobby by ID: ${id}...`);
  
  try {
    const [lobby] = await db.select().from(lobbies).where(eq(lobbies.id, id));
    if (lobby) {
      console.log('✅ Found lobby:', lobby);
      return lobby;
    } else {
      console.log('❌ Lobby not found');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to get lobby:', error);
    throw error;
  }
}

export async function testUpdateLobby(id: bigint) {
  console.log(`🧪 Testing Update Lobby: ${id}...`);
  
  const updateData = {
    note: 'Updated via manual test',
    maxTeamSize: 6,
    isMicRequired: true
  };

  try {
    const [updated] = await db
      .update(lobbies)
      .set(updateData)
      .where(eq(lobbies.id, id))
      .returning();
    
    if (updated) {
      console.log('✅ Updated lobby:', updated);
      return updated;
    } else {
      console.log('❌ Lobby not found for update');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to update lobby:', error);
    throw error;
  }
}

export async function testDeleteLobby(id: bigint) {
  console.log(`🧪 Testing Delete Lobby: ${id}...`);
  
  try {
    const [deleted] = await db
      .delete(lobbies)
      .where(eq(lobbies.id, id))
      .returning();
    
    if (deleted) {
      console.log('✅ Deleted lobby:', deleted);
      return deleted;
    } else {
      console.log('❌ Lobby not found for deletion');
      return null;
    }
  } catch (error) {
    console.error('❌ Failed to delete lobby:', error);
    throw error;
  }
}

export async function testMultipleLobbies() {
  console.log('🧪 Testing Multiple Lobbies Creation...');
  
  const lobbiesData = [
    {
      gameId: BigInt(1),
      regionId: BigInt(1),
      modeId: BigInt(1),
      minTeamSize: 2,
      maxTeamSize: 5,
      type: 'public' as const,
      isMicRequired: false,
      creatorId: BigInt(1),
      ownerId: BigInt(1),
      note: 'Public lobby 1'
    },
    {
      gameId: BigInt(2),
      regionId: BigInt(2),
      modeId: BigInt(2),
      minTeamSize: 1,
      maxTeamSize: 4,
      type: 'private' as const,
      isMicRequired: true,
      creatorId: BigInt(2),
      ownerId: BigInt(2),
      note: 'Private lobby 1'
    }
  ];

  try {
    const created = await db.insert(lobbies).values(lobbiesData).returning();
    console.log(`✅ Created ${created.length} lobbies:`, created);
    return created;
  } catch (error) {
    console.error('❌ Failed to create multiple lobbies:', error);
    throw error;
  }
}

export async function cleanupTestData() {
  console.log('🧹 Cleaning up test data...');
  
  try {
    const deleted = await db.delete(lobbies).returning();
    console.log(`✅ Cleaned up ${deleted.length} lobbies`);
    return deleted;
  } catch (error) {
    console.error('❌ Failed to cleanup:', error);
    throw error;
  }
}

// Helper function to run all tests
export async function runAllTests() {
  console.log('🚀 Starting Manual Database Tests...\n');
  
  try {
    // Clean up first
    await cleanupTestData();
    
    // Test create
    const created = await testCreateLobby();
    
    // Test get all
    await testGetAllLobbies();
    
    // Test get by ID
    await testGetLobbyById(created.id);
    
    // Test update
    await testUpdateLobby(created.id);
    
    // Test multiple creation
    await testMultipleLobbies();
    
    // Test get all again
    await testGetAllLobbies();
    
    // Test delete
    await testDeleteLobby(created.id);
    
    // Final cleanup
    await cleanupTestData();
    
    console.log('\n🎉 All manual tests completed successfully!');
  } catch (error) {
    console.error('\n💥 Manual tests failed:', error);
    throw error;
  }
}

// Uncomment the line below to run tests when this file is executed
// runAllTests().catch(console.error); 