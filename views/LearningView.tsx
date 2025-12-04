import React, { useState } from 'react';
import { BookOpen, Star, Clock, PlayCircle, X } from 'lucide-react';

const courses = [
  { title: 'Chaos Engineering Basics', author: 'MTS Practice', duration: '4h 30m', rating: 4.8, level: 'Advanced', color: 'bg-[#E30611]' }, // MTS Red
  { title: 'Golang Microservices', author: 'Backend Guild', duration: '12h 15m', rating: 4.9, level: 'Intermediate', color: 'bg-slate-800' }, // Black
  { title: 'Product Managament Frameworks', author: 'Product Guild', duration: '6h 00m', rating: 4.7, level: 'Beginner', color: 'bg-gray-500' }, // Gray
  { title: 'Effective Communication', author: 'HR Dept', duration: '2h 45m', rating: 4.5, level: 'All Levels', color: 'bg-slate-600' }, // Dark Gray
  { title: 'MTS Ecosystem Overview', author: 'Onboarding', duration: '1h 30m', rating: 4.6, level: 'Beginner', color: 'bg-[#990000]' }, // Dark Red
];

const LearningView: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<any>(null);

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Online Courses</h1>
        <p className="text-gray-500 dark:text-gray-400">Upskill with internal courses and workshops from MTS Guilds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className={`h-32 ${course.color} relative p-6 flex flex-col justify-between`}>
              <span className="inline-block px-2 py-1 bg-white/20 text-white text-[10px] rounded font-bold backdrop-blur-sm self-start">
                {course.level}
              </span>
              <PlayCircle className="absolute right-4 top-4 text-white opacity-20 group-hover:opacity-40 transition-opacity" size={48} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{course.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{course.author}</p>
              
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-1 text-yellow-500 font-bold">
                   <Star size={14} fill="currentColor" />
                   <span>{course.rating}</span>
                 </div>
                 <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-medium">
                   <Clock size={14} />
                   <span>{course.duration}</span>
                 </div>
              </div>
              
              <button 
                onClick={() => setActiveCourse(course)}
                className="w-full mt-4 py-2 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-[#E30611] transition-colors text-sm"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
             <div className={`w-16 h-16 ${activeCourse.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                <BookOpen size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Enrolled Successfully!</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
               You have started <b>{activeCourse.title}</b>. This will be added to your employee development plan.
             </p>
             <button onClick={() => setActiveCourse(null)} className="w-full py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700">Continue to Course</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default LearningView;