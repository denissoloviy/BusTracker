namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CheckBoxSaved : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BusModels", "Wight", c => c.Int(nullable: false));
            AddColumn("dbo.BusModels", "Height", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BusModels", "Height");
            DropColumn("dbo.BusModels", "Wight");
        }
    }
}
