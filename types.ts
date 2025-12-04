import React from 'react';

export type ViewState = 
  | 'overview' 
  | 'projects' 
  | 'dashboard-product' 
  | 'dashboard-team' 
  | 'dashboard-employee' 
  | 'courses' 
  | 'profile-overview'
  | 'profile-tamagotchi'
  | 'profile-campaigns'
  | 'profile-documents'
  | 'profile-followers'
  | 'account' 
  | 'corporate' 
  | 'blog' 
  | 'messenger';

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