'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

interface ReportFormProps {
  shopId: number;
}

const REPORT_TYPES = [
  { value: 'incorrect_info', label: '정보 오류' },
  { value: 'closed', label: '폐업/휴업' },
  { value: 'inappropriate', label: '부적절한 내용' },
  { value: 'duplicate', label: '중복 등록' },
  { value: 'other', label: '기타' },
];

export default function ReportForm({ shopId }: ReportFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reportType, setReportType] = useState('incorrect_info');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!content.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('reports').insert({
      shop_id: shopId,
      user_id: user.id,
      report_type: reportType,
      content: content.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      console.error('신고 실패:', error);
      alert('신고 접수에 실패했습니다. 다시 시도해주세요.');
    } else {
      alert('신고가 접수되었습니다. 검토 후 처리하겠습니다.');
      setContent('');
      setIsOpen(false);
    }
  };

  return (
    <div className='mt-4 border-t pt-4'>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className='flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors'
        >
          <AlertCircle size={16} />
          <span>이 가게 정보 신고하기</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='font-semibold text-sm flex items-center gap-2'>
              <AlertCircle size={16} className='text-red-500' />
              신고하기
            </h4>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='text-xs text-gray-500 hover:text-gray-700'
            >
              취소
            </button>
          </div>

          {/* 신고 유형 선택 */}
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500'
          >
            {REPORT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* 신고 내용 입력 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='신고 사유를 자세히 입력해주세요'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px] resize-none'
            maxLength={500}
          />
          <p className='text-xs text-gray-500 text-right'>{content.length}/500</p>

          {/* 제출 버튼 */}
          <button
            type='submit'
            disabled={isSubmitting || !content.trim()}
            className='w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors text-sm'
          >
            {isSubmitting ? '접수 중...' : '신고 접수'}
          </button>

          <p className='text-xs text-gray-500'>허위 신고 시 서비스 이용이 제한될 수 있습니다.</p>
        </form>
      )}
    </div>
  );
}
