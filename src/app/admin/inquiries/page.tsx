'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getInquiries, updateInquiryStatus, type InquiryData } from '@/lib/admin-data';

const AdminInquiries = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const router = useRouter();

  const loadInquiries = () => {
    setInquiries(getInquiries());
  };

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
      loadInquiries();
    }
  }, [router]);

  useEffect(() => {
    const handleInquiriesUpdated = () => {
      loadInquiries();
    };
    
    window.addEventListener('inquiriesUpdated', handleInquiriesUpdated);
    return () => window.removeEventListener('inquiriesUpdated', handleInquiriesUpdated);
  }, []);

  const handleStatusChange = (id: string, status: InquiryData['status']) => {
    updateInquiryStatus(id, status);
    loadInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);

  const getStatusBadgeClass = (status: InquiryData['status']) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-700';
      case 'read': return 'bg-amber-100 text-amber-700';
      case 'replied': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: InquiryData['status']) => {
    switch (status) {
      case 'unread': return '未读';
      case 'read': return '已读';
      case 'replied': return '已回复';
      default: return status;
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* 顶部导航栏 */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-xl font-bold text-foreground">
                HEGU Tech
              </Link>
              <span className="text-sm text-muted-foreground">询盘管理</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all text-sm"
              >
                ← 返回后台
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：询盘列表 */}
          <div className="lg:w-1/2">
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-foreground">询盘列表</h1>
                <div className="flex gap-2">
                  {(['all', 'unread', 'read', 'replied'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        filter === f
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {f === 'all' ? '全部' : getStatusText(f)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>暂无询盘</p>
                  </div>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedInquiry?.id === inquiry.id
                          ? 'bg-primary/10 border-primary/50'
                          : 'bg-background border-border hover:border-border/80 hover:bg-background/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {inquiry.name}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(inquiry.status)}`}>
                              {getStatusText(inquiry.status)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {inquiry.company}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(inquiry.createdAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 右侧：询盘详情 */}
          <div className="lg:w-1/2">
            {selectedInquiry ? (
              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">询盘详情</h2>
                  <div className="flex gap-2">
                    {selectedInquiry.status !== 'read' && (
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'read')}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm hover:bg-amber-200 transition-all"
                      >
                        标记已读
                      </button>
                    )}
                    {selectedInquiry.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'replied')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-all"
                      >
                        标记已回复
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">姓名</label>
                      <p className="font-medium text-foreground">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">公司</label>
                      <p className="font-medium text-foreground">{selectedInquiry.company}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">邮箱</label>
                      <p className="font-medium text-foreground">{selectedInquiry.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">电话</label>
                      <p className="font-medium text-foreground">{selectedInquiry.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">国家</label>
                      <p className="font-medium text-foreground">{selectedInquiry.country}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">感兴趣产品</label>
                      <p className="font-medium text-foreground">{selectedInquiry.productInterest}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">留言内容</label>
                    <div className="mt-2 p-4 bg-background rounded-xl border border-border">
                      <p className="text-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        收到时间：{new Date(selectedInquiry.createdAt).toLocaleString('zh-CN')}
                      </div>
                      <a
                        href={`mailto:${selectedInquiry.email}?subject=Re: Your Inquiry to HEGU Technology`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
                      >
                        回复邮件
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-12 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">请选择一个询盘查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInquiries;
