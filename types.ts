import React from 'react';

export type ViewState = 
  | 'overview' 
  | 'projects' 
  | 'dashboard-product' 
  | 'dashboard-team' 
  | 'dashboard-employee' 
  | 'pr-coach'
  | 'courses' 
  | 'profile-overview'
  | 'profile-360'
  | 'profile-career'
  | 'profile-job-crafting'
  | 'profile-tamagotchi'
  | 'profile-campaigns'
  | 'profile-documents'
  | 'profile-followers'
  | 'profile-kudos'
  | 'profile-shop'
  | 'account' 
  | 'corporate' 
  | 'blog' 
  | 'messenger'
  | 'jira';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  role?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  color?: string;
  icon?: React.ReactNode;
}