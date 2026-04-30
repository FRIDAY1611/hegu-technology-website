import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/storage/database/supabase-client';
import { Database, Json } from '@/storage/database/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type InsertBlogPost = Database['public']['Tables']['blog_posts']['Insert'];
type UpdateBlogPost = Database['public']['Tables']['blog_posts']['Update'];

// 获取所有博客文章
export async function GET() {
  try {
    const supabase = getSupabaseServiceClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 创建博客文章
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = getSupabaseServiceClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([body as InsertBlogPost])
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 更新博客文章
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const supabase = getSupabaseServiceClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData as UpdateBlogPost)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 删除博客文章
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = getSupabaseServiceClient();
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
