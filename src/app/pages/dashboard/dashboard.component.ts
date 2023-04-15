import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private messageService: MessageService) {}
  items!: MenuItem[];
  academicEmp!: boolean;
  adminEmp!: boolean;
  academicPayRoll!: boolean;
  adminPayRoll!: boolean;
  packagePayRoll!: boolean;
  trainingPayRoll!: boolean;
  reports!: boolean;
  absence!: boolean;
  advance!: boolean;
  partial!: boolean;
  settings!: boolean;
  roleId!:any;

  ngOnInit(): void {

    this.roleId = localStorage.getItem("Role");
    if(this.roleId =="1")
    {
      this.items = [
        {
          label: 'الرئيسية',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard/statiscs',
        },
        {
          label: 'الموظفين الإداريين',
          icon: 'pi pi-fw pi-user',
          routerLink: '/dashboard/adminEmp',
        },
        {
          label: 'الموظفيين الأكاديمين',
          icon: 'pi pi-fw pi-building',
          routerLink: 'academicEmp',
        },
        {
          label: 'صرف مرتب إداري',
          icon: 'pi pi-fw pi-users',
          routerLink: 'adminPayroll',
        },
        {
          label: 'صرف مرتب أكاديمي',
          icon: 'pi pi-fw pi-users',
          routerLink: 'academicPayroll',
        },
        {
          label: 'صرف مرتب الحزم',
          icon: 'pi pi-fw pi-users',
          routerLink: 'packagePayroll',
        },
        {
          label: 'صرف مرتب جزئي',
          icon: 'pi pi-fw pi-users',
          routerLink: 'partialPayRoll',
        },
        {
          label: 'صرف مرتب المتدربين',
          icon: 'pi pi-fw pi-users',
          routerLink: 'trainingPayRoll',
        },
        {
          label: 'السلفيات',
          icon: 'pi pi-fw pi-users',
          items:
          [
            {
              label: 'سلفيات الموظفين',
              icon: 'pi pi-fw pi-users',
              routerLink: 'advance',
            },
            {
              label: 'السلفيات الجزئيين',
              icon: 'pi pi-fw pi-users',
              routerLink: 'partialAdvance',
            }
          ]
        },
        {
          label: 'الغياب والتأخير',
          icon: 'pi pi-fw pi-users',
          routerLink: 'absence',
        },
        {
          label: 'التقارير',
          icon: 'pi pi-fw pi-book',
          routerLink: 'reports',
        },
        {
          label: 'الاعدادات',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: 'المستخدمين',
              icon: 'pi pi-fw pi-user',
              routerLink: 'settings/users',
            },
            {
              label: 'حافز الأداء',
              icon: 'pi pi-fw pi-paperclip',
              routerLink: 'settings/performanceIncentive',
            },
            {
              label: 'نسبة الأداء للأكاديمين',
              icon: 'pi pi-fw pi-paperclip',
              routerLink: 'settings/academicsRate',
            },
            {
              label: 'نسبة الأداء للإداريين',
              icon: 'pi pi-fw pi-paperclip',
              routerLink: 'settings/adminsRate',
            },
            {
              label: 'قيمة التكليف الإداري للأكاديمين',
              icon: 'pi pi-fw pi-paperclip',
              routerLink: 'settings/adminAssign',
            },
            {
              label: 'حافز الخبرة الداخلية',
              icon: 'pi pi-fw pi-pencil',
              routerLink: 'settings/internalExperience',
            },
            {
              label: 'مدخل الدرجة',
              icon: 'pi pi-fw pi-paperclip',
              routerLink: 'settings/degreeRoller',
            },
            {
              label: 'التأمين الإجتماعي الأول',
              icon: 'pi pi-fw pi-copy',
              routerLink: 'settings/firstSocialInsurance',
            },
            {
              label: 'التأمين الإجتماعي النهائي',
              icon: 'pi pi-fw pi-dollar',
              routerLink: 'settings/lastSocialInsurance',
            },
            {
              label: 'الضريبة على الدخل الشخصي',
              icon: 'pi pi-fw pi-dollar',
              routerLink: 'settings/personalIncomeTax',
            },
            {
              label: 'الضريبة على البدلات المتغيرة',
              icon: 'pi pi-fw pi-wallet',
              routerLink: 'settings/taxOnVariableAllowances',
            },
            {
              label: 'الدمغة على الأساسي',
              icon: 'pi pi-fw pi-money-bill',
              routerLink: 'settings/stampBase',
            },
            {
              label: 'الدمغة على البدلات',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/stampSign',
            },
            {
              label: 'حافز الكتب و البحوث',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/booksAndResearch',
            },
            {
              label: 'الحزم',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/package',
            },
            {
              label: 'الجزئيين',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/partial',
            },
            {
              label: 'المتدربين',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/training',
            },
            {
              label: 'الأقسام',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/department',
            },
            {
              label: 'انواع البدلات',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/allowance',
            }
          ],
        },
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        },
      ];
    }
    else if(this.roleId=="2")
    {
      this.items = [
        {
          label: 'الرئيسية',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard/statiscs',
        },
        {
          label: 'التقارير',
          icon: 'pi pi-fw pi-book',
          routerLink: 'reports',
        },
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        },
      ];
    }
    else if(this.roleId=="3")
    {
      this.items = [
        {
          label: 'الرئيسية',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard/statiscs',
        },
        {
          label: 'صرف مرتب إداري',
          icon: 'pi pi-fw pi-users',
          routerLink: 'adminPayroll',
        },
        {
          label: 'صرف مرتب أكاديمي',
          icon: 'pi pi-fw pi-users',
          routerLink: 'academicPayroll',
        },
        {
          label: 'صرف مرتب الحزم',
          icon: 'pi pi-fw pi-users',
          routerLink: 'packagePayroll',
        },
        {
          label: 'صرف مرتب جزئي',
          icon: 'pi pi-fw pi-users',
          routerLink: 'partialPayRoll',
        },
        {
          label: 'صرف مرتب المتدربين',
          icon: 'pi pi-fw pi-users',
          routerLink: 'trainingPayRoll',
        },
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        },
      ];
    }
    else if(this.roleId=="4")
    {
      this.items = [
        {
          label: 'الرئيسية',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard/statiscs',
        },
        {
          label: 'الموظفين الإداريين',
          icon: 'pi pi-fw pi-user',
          routerLink: '/dashboard/adminEmp',
        },
        {
          label: 'الموظفيين الأكاديمين',
          icon: 'pi pi-fw pi-building',
          routerLink: 'academicEmp',
        },
        {
          label: 'الاعدادات',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: 'الحزم',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/package',
            },
            {
              label: 'الجزئيين',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/partial',
            },
            {
              label: 'المتدربين',
              icon: 'pi pi-fw pi-shield',
              routerLink: 'settings/training',
            },
          ],
        },
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        },
      ];
    }
    else if(this.roleId=="5")
    {
      this.items = [
        {
          label: 'الرئيسية',
          icon: 'pi pi-fw pi-home',
          routerLink: '/dashboard/statiscs',
        },
        {
          label: 'السلفيات',
          icon: 'pi pi-fw pi-users',
          items:
          [
            {
              label: 'سلفيات الموظفين',
              icon: 'pi pi-fw pi-users',
              routerLink: 'advance',
            },
            {
              label: 'السلفيات الجزئيين',
              icon: 'pi pi-fw pi-users',
              routerLink: 'partialAdvance',
            }
          ]
        },
        {
          label: 'الغياب والتأخير',
          icon: 'pi pi-fw pi-users',
          routerLink: 'absence',
        },
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        },
      ];
    }
    else
    {
      this.items = [
        {
          label: 'تسجيل خروج',
          icon: 'pi pi-fw pi-power-off',
          routerLink: '/',
        }
      ]
    }

  }
}
